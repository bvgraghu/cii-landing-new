const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'hero');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const files = [
    { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop', dest: 'awareness.jpg' },
    { url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=800&auto=format&fit=crop', dest: 'eoi.jpg' },
    { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', dest: 'assessments.jpg' },
    { url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop', dest: 'co2.jpg' }
];

files.forEach(file => {
    const destPath = path.join(dir, file.dest);
    const fileStream = fs.createWriteStream(destPath);
    console.log(`Downloading ${file.dest}...`);
    https.get(file.url, function(response) {
        response.pipe(fileStream);
        fileStream.on('finish', function() {
            fileStream.close(() => {
                console.log(`Done: ${file.dest}`);
            });
        });
    }).on('error', function(err) { 
        fs.unlink(destPath, () => {});
        console.error(`Error downloading ${file.dest}: ${err.message}`);
    });
});
