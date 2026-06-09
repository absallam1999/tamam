import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon sizes for different purposes
const pwaSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const faviconSizes = [16, 32, 48, 64];
const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180];
const androidSizes = [192, 256, 384, 512];
const microsoftSizes = [70, 150, 310];
const shortcutSizes = [96];

const inputSvg = path.join(__dirname, '../public/icon.svg');
const outputDir = path.join(__dirname, '../public');

// Define output folders
const folders = {
  pwa: path.join(outputDir, 'icons'),
  favicon: path.join(outputDir, 'favicon'),
  apple: path.join(outputDir, 'apple-touch-icons'),
  android: path.join(outputDir, 'android-icons'),
  microsoft: path.join(outputDir, 'microsoft-tiles'),
  shortcuts: path.join(outputDir, 'shortcuts'),
  social: path.join(outputDir, 'social'),
  screenshots: path.join(outputDir, 'screenshots'),
  svg: path.join(outputDir, 'svg')
};

// Create all output directories
for (const folder of Object.values(folders)) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

async function generateImage(image, size, logoScale = 0.7, backgroundColor = null, withPadding = false) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);
  } else {
    ctx.clearRect(0, 0, size, size);
  }
  
  let logoSize, offset;
  if (withPadding) {
    logoSize = size * 0.78;
    offset = (size - logoSize) / 2;
  } else {
    logoSize = size * logoScale;
    offset = (size - logoSize) / 2;
  }
  
  ctx.drawImage(image, offset, offset, logoSize, logoSize);
  
  return canvas.toBuffer('image/png');
}

async function generateScreenshot(size, label) {
  const canvas = createCanvas(size.width, size.height);
  const ctx = canvas.getContext('2d');
  
  const gradient = ctx.createLinearGradient(0, 0, size.width, size.height);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size.width, size.height);
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(20, 60, size.width - 40, 60);
  ctx.fillRect(20, 140, size.width - 40, 200);
  ctx.fillRect(20, 360, size.width - 40, 80);
  
  const image = await loadImage(inputSvg);
  const logoSize = Math.min(size.width, size.height) * 0.15;
  const logoX = (size.width - logoSize) / 2;
  const logoY = 20;
  ctx.drawImage(image, logoX, logoY, logoSize, logoSize);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.floor(size.width * 0.05)}px "Inter", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(label, size.width / 2, logoY + logoSize + 40);
  
  return canvas.toBuffer('image/png');
}

async function encodeIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);
  
  const chunks = [header];
  let offset = 6 + pngBuffers.length * 16;
  
  for (let i = 0; i < pngBuffers.length; i++) {
    const png = pngBuffers[i];
    const dir = Buffer.alloc(16);
    const width = 16;
    const height = 16;
    dir.writeUInt8(width, 0);
    dir.writeUInt8(height, 1);
    dir.writeUInt8(0, 2);
    dir.writeUInt8(0, 3);
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(png.length, 8);
    dir.writeUInt32LE(offset, 12);
    chunks.push(dir);
    offset += png.length;
  }
  
  for (const png of pngBuffers) {
    chunks.push(png);
  }
  
  return Buffer.concat(chunks);
}

async function generateIcons() {
  try {
    if (!fs.existsSync(inputSvg)) {
      console.error('Error: Input SVG not found at', inputSvg);
      process.exit(1);
    }
    
    const image = await loadImage(inputSvg);
    
    // 1. Generate PWA icons
    for (const size of pwaSizes) {
      const buffer = await generateImage(image, size, 0.7);
      const outputPath = path.join(folders.pwa, `icon-${size}x${size}.png`);
      fs.writeFileSync(outputPath, buffer);
    }
    
    // 2. Generate favicon PNGs
    for (const size of faviconSizes) {
      const buffer = await generateImage(image, size, 0.8);
      const outputPath = path.join(folders.favicon, `favicon-${size}x${size}.png`);
      fs.writeFileSync(outputPath, buffer);
    }
    
    // 3. Generate Apple Touch Icons
    for (const size of appleSizes) {
      const buffer = await generateImage(image, size, 0.65, '#1a1a2e', true);
      const outputPath = path.join(folders.apple, `apple-touch-icon-${size}x${size}.png`);
      fs.writeFileSync(outputPath, buffer);
    }
    
    // 4. Generate Android Chrome Icons
    for (const size of androidSizes) {
      const buffer = await generateImage(image, size, 0.65, '#1a1a2e', true);
      const outputPath = path.join(folders.android, `android-chrome-${size}x${size}.png`);
      fs.writeFileSync(outputPath, buffer);
    }
    
    // 5. Generate Microsoft Tile Icons
    for (const size of microsoftSizes) {
      const backgroundColor = size === 150 ? '#1a1a2e' : null;
      const buffer = await generateImage(image, size, 0.65, backgroundColor);
      const outputPath = path.join(folders.microsoft, `mstile-${size}x${size}.png`);
      fs.writeFileSync(outputPath, buffer);
    }
    
    // 6. Generate maskable icon
    const maskableCanvas = createCanvas(512, 512);
    const maskableCtx = maskableCanvas.getContext('2d');
    
    maskableCtx.fillStyle = '#1a1a2e';
    maskableCtx.fillRect(0, 0, 512, 512);
    
    const maskableSize = 400;
    const maskableOffset = (512 - maskableSize) / 2;
    maskableCtx.drawImage(image, maskableOffset, maskableOffset, maskableSize, maskableSize);
    
    const maskableBuffer = maskableCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(folders.pwa, 'icon-512x512-maskable.png'), maskableBuffer);
    
    // 7. Generate shortcut icons
    for (const size of shortcutSizes) {
      const buffer = await generateImage(image, size, 0.7, '#1a1a2e', true);
      const shortcuts = ['order', 'track', 'cart', 'support'];
      for (const shortcut of shortcuts) {
        const outputPath = path.join(folders.shortcuts, `shortcut-${shortcut}.png`);
        fs.writeFileSync(outputPath, buffer);
      }
    }
    
    // 8. Generate favicon.ico (simplified - just save as .ico format)
    // Note: For simplicity, we'll just note that ICO generation requires a library
    // Create a simple ICO file or skip if not critical
    console.log('Note: ICO file generation skipped. Use online tool or ico-lib for Windows favicon support.');
    
    // 9. Copy SVG files
    fs.copyFileSync(inputSvg, path.join(folders.svg, 'favicon.svg'));
    fs.copyFileSync(inputSvg, path.join(folders.svg, 'safari-pinned-tab.svg'));
    
    // 10. Generate OG image for social media
    const ogCanvas = createCanvas(1200, 630);
    const ogCtx = ogCanvas.getContext('2d');
    
    const ogGradient = ogCtx.createLinearGradient(0, 0, 1200, 630);
    ogGradient.addColorStop(0, '#1a1a2e');
    ogGradient.addColorStop(1, '#16213e');
    ogCtx.fillStyle = ogGradient;
    ogCtx.fillRect(0, 0, 1200, 630);
    
    const ogLogoSize = 200;
    const ogLogoX = (1200 - ogLogoSize) / 2;
    const ogLogoY = (630 - ogLogoSize) / 2 - 50;
    ogCtx.drawImage(image, ogLogoX, ogLogoY, ogLogoSize, ogLogoSize);
    
    const ogBuffer = ogCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(folders.social, 'og-image.jpg'), ogBuffer);
    
    // 11. Generate Twitter card image
    const twitterCanvas = createCanvas(1200, 600);
    const twitterCtx = twitterCanvas.getContext('2d');
    
    const twitterGradient = twitterCtx.createLinearGradient(0, 0, 1200, 600);
    twitterGradient.addColorStop(0, '#a855f7');
    twitterGradient.addColorStop(1, '#ec4899');
    twitterCtx.fillStyle = twitterGradient;
    twitterCtx.fillRect(0, 0, 1200, 600);
    
    const twitterLogoSize = 150;
    const twitterLogoX = (1200 - twitterLogoSize) / 2;
    const twitterLogoY = (600 - twitterLogoSize) / 2 - 40;
    twitterCtx.drawImage(image, twitterLogoX, twitterLogoY, twitterLogoSize, twitterLogoSize);
    
    const twitterBuffer = twitterCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(folders.social, 'twitter-image.jpg'), twitterBuffer);
    
    // 12. Generate screenshots
    const screenshots = [
      { name: 'home-screen', label: 'Home Screen', width: 1280, height: 720 },
      { name: 'order-screen', label: 'Order Screen', width: 1280, height: 720 },
      { name: 'tracking-screen', label: 'Tracking Screen', width: 1280, height: 720 },
      { name: 'mobile-home', label: 'Mobile Home', width: 720, height: 1280 },
      { name: 'mobile-order', label: 'Mobile Order', width: 720, height: 1280 }
    ];
    
    for (const screenshot of screenshots) {
      const buffer = await generateScreenshot(
        { width: screenshot.width, height: screenshot.height },
        screenshot.label
      );
      const outputPath = path.join(folders.screenshots, `${screenshot.name}.png`);
      fs.writeFileSync(outputPath, buffer);
    }
    
  } catch (error) {
    console.error('Error generating icons:', error.message);
  }
}

generateIcons();