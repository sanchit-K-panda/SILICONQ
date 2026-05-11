import html2canvas from 'html2canvas';

export async function exportPNG(elementId, filename = 'siliconq_export.png') {
  const element = document.getElementById(elementId) || document.body;
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, 
      logging: false,
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    // silent catch to prevent console logs per requirements
  }
}
