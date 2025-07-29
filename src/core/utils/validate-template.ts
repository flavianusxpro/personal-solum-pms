/**
 * Validates email template by checking if all required fields appear the correct number of times
 * @param emailTemplate - The email template HTML content to validate
 * @param requiredFields - Array of required field names (can contain duplicates)
 * @returns Object with validation result and error message
 */
export function templateValidation(
  emailTemplate: string | undefined,
  requiredFields: string[],
  isEnable: boolean
): { isValid: boolean; errorMessage?: string } {
  // Count occurrences of each field in the validation array
  const fieldCounts = requiredFields.reduce(
    (acc, field) => {
      acc[field] = (acc[field] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Check if email template contains the required number of each field
  const isValid = Object.entries(fieldCounts).every(
    ([field, requiredCount]) => {
      const actualCount = (emailTemplate?.match(new RegExp(field, 'g')) || [])
        .length;
      return actualCount >= requiredCount;
    }
  );

  if (!isValid && isEnable) {
    const missingFields = Object.entries(fieldCounts)
      .filter(([field, requiredCount]) => {
        const actualCount = (emailTemplate?.match(new RegExp(field, 'g')) || [])
          .length;
        return actualCount < requiredCount;
      })
      .map(([field, requiredCount]) => {
        const actualCount = (emailTemplate?.match(new RegExp(field, 'g')) || [])
          .length;
        return `${field} is missing ${requiredCount - actualCount} times`;
      });

    const errorMessage = missingFields.join('\n');
    return { isValid: false, errorMessage };
  }

  return { isValid: true };
}
