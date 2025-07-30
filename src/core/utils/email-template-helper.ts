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
    <div class="header" style="text-align: center; background-color: #1976d2; color: white; padding: 20px 0;">
      <h2>Email Template</h2>
    </div>
    <div class="content" style="padding: 20px; line-height: 1.6; color: #333333;">
      <!-- Content will be inserted here -->
    </div>
    <div class="footer" style="text-align: center; font-size: 12px; color: #888888; padding-top: 20px;">
      &copy; 2025 {{ Clinic_Name }}. All rights reserved.<br>
      {{ Clinic_Address }}
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
export function wrapWithFullStructure(
  bodyContent: string,
  templateName: string = 'Email Template'
): string {
  const structure = { ...DEFAULT_EMAIL_STRUCTURE };

  // Update title and header with template name
  structure.head = structure.head.replace('Email Template', templateName);
  structure.body = structure.body.replace('Email Template', templateName);

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

/**
 * Checks if HTML has full structure (DOCTYPE, html, head, body tags)
 */
export function hasFullStructure(html: string): boolean {
  return (
    html.includes('<!DOCTYPE html>') &&
    html.includes('<html') &&
    html.includes('<head') &&
    html.includes('<body')
  );
}

/**
 * Creates a new email template with default structure
 */
export function createNewEmailTemplate(
  templateName: string = 'New Template'
): string {
  return wrapWithFullStructure('', templateName);
}
