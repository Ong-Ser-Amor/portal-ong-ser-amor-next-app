/**
 * Utilitários para operações PATCH
 * Permite enviar apenas os campos que foram alterados em uma requisição PATCH
 */

/**
 * Compara dois objetos e retorna apenas os campos que foram alterados
 * @param original - Objeto original (estado anterior)
 * @param updated - Objeto atualizado (novo estado)
 * @returns Objeto contendo apenas os campos alterados
 */
export function getChangedFields<T>(original: T, updated: T): Partial<T> {
  const changes: Partial<T> = {};

  // Iterar sobre as chaves do objeto atualizado
  for (const key in updated) {
    if (Object.prototype.hasOwnProperty.call(updated, key)) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      // Verificar se o valor mudou
      if (!areValuesEqual(originalValue, updatedValue)) {
        changes[key] = updatedValue;
      }
    }
  }

  return changes;
}

/**
 * Compara dois valores para verificar se são iguais
 * Lida com tipos primitivos, números com tolerância, e datas
 * @param a - Primeiro valor
 * @param b - Segundo valor
 * @returns true se os valores forem considerados iguais
 */
function areValuesEqual(a: unknown, b: unknown): boolean {
  // Verificação de igualdade estrita
  if (a === b) return true;

  // Verificação para null/undefined
  if (a == null || b == null) return a == b;

  // Verificação para números com tolerância (valores monetários)
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.001;
  }

  // ✅ MELHORADA: Verificação mais específica para decimais monetários
  if (
    (typeof a === 'string' && typeof b === 'number') ||
    (typeof a === 'number' && typeof b === 'string')
  ) {
    const strValue = typeof a === 'string' ? a : b.toString();
    const numValue = typeof a === 'number' ? a : parseFloat(b as string);

    // ✅ Só aplicar para strings que parecem valores monetários
    if (strValue.match(/^\d+\.?\d*$/) && !isNaN(numValue)) {
      return Math.abs(parseFloat(strValue) - numValue) < 0.001;
    }
  }

  // Para outros tipos, usar comparação estrita
  return false;
}

/**
 * Verifica se um objeto de mudanças está vazio (não há alterações)
 * @param changes - Objeto com as mudanças
 * @returns true se não houver mudanças
 */
export function hasNoChanges<T>(changes: Partial<T>): boolean {
  return Object.keys(changes).length === 0;
}
