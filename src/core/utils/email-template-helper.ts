/**
 * Email template HTML structure helper utilities
 * Handles preserving full HTML structure when using React Quill
 */

export interface EmailTemplateStructure {
  doctype: string;
  html: string;
  head: string;
  body: string;
}

const DEFAULT_EMAIL_STRUCTURE: EmailTemplateStructure = {
  doctype: '<!DOCTYPE html>',
  html: '<html lang="en" style="font-family: Arial, sans-serif;">',
  head: `<head>
  <meta charset="UTF-8">
  <title>Email Template</title>
</head>`,
  body: `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <div class="email-container" style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; background-color: #ffffff;">
    <div class="content" style="padding: 20px; line-height: 1.6; color: #333333;">
      <!-- Content will be inserted here -->
    </div>
  </div>
</body>`,
};

/**
 * Extracts body content from full HTML structure
 * Used when loading existing template into Quill editor
 */
export function extractBodyContent(fullHtml: string): string {
  if (!fullHtml) return '';

  // Check if it's already just body content (no DOCTYPE)
  if (!fullHtml.includes('<!DOCTYPE html>') && !fullHtml.includes('<html')) {
    return fullHtml;
  }

  // Try to extract content from div.content first (most specific)
  const contentMatch = fullHtml.match(
    /<div[^>]*class="content"[^>]*>([\s\S]*?)<\/div>/i
  );
  if (contentMatch) {
    return contentMatch[1].trim();
  }

  // Extract content from body tag
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1].trim();
  }

  // Fallback: try to extract content from div.email-container
  const containerMatch = fullHtml.match(
    /<div[^>]*class="email-container"[^>]*>([\s\S]*)<\/div>/i
  );
  if (containerMatch) {
    return containerMatch[1].trim();
  }

  return fullHtml;
}

/**
 * Wraps body content with full HTML structure
 * Used when saving from Quill editor
 */
export function wrapWithFullStructure(bodyContent: string): string {
  // Check if bodyContent already contains full HTML structure
  if (
    bodyContent.includes('<!DOCTYPE html>') ||
    bodyContent.includes('<html')
  ) {
    return bodyContent;
  }

  // Check if bodyContent already has header or footer elements
  const hasHeader =
    bodyContent.includes('class="header"') ||
    bodyContent.includes('class="ql-align-center"');
  const hasFooter =
    bodyContent.includes('© 2025') ||
    bodyContent.includes('{{ Clinic_Name }}') ||
    bodyContent.includes('{{ Clinic_Address }}');

  // If content already has header and footer, just wrap with basic structure
  if (hasHeader || hasFooter) {
    return `<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif;">
<head>
  <meta charset="UTF-8">
  <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <div class="email-container" style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; background-color: #ffffff;">
    ${bodyContent}
  </div>
</body>
</html>`;
  }

  // If no header/footer, use default structure
  const structure = { ...DEFAULT_EMAIL_STRUCTURE };

  // Insert body content into the content div
  const contentDivMatch = structure.body.match(
    /(<div class="content"[^>]*>)([\s\S]*?)(<\/div>)/i
  );
  if (contentDivMatch) {
    const beforeContent = contentDivMatch[1];
    const afterContent = contentDivMatch[3];
    structure.body = structure.body.replace(
      contentDivMatch[0],
      `${beforeContent}${bodyContent}${afterContent}`
    );
  }

  return `${structure.doctype}\n${structure.html}\n${structure.head}\n${structure.body}\n</html>`;
}
