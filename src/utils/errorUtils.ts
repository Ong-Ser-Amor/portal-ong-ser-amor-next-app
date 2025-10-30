/**
 * Utilitários para tratamento de erros com mensagens amigáveis ao usuário
 */

export interface ApiError {
  status: number;
  message: string;
  originalError?: unknown;
}

interface ErrorWithResponse {
  response?: {
    status?: number;
  };
  status?: number;
  message?: string;
  name?: string;
}

/**
 * Converte erros de API em mensagens amigáveis para o usuário
 */
export const getLoginErrorMessage = (error: unknown): string => {
  const err = error as ErrorWithResponse;

  // Se o erro já tem uma mensagem customizada, usa ela
  if (err.message && !err.message.includes('Erro na requisição:')) {
    return err.message;
  }

  // Trata erros baseados no status HTTP
  if (err.status || (err.response && err.response.status)) {
    const status = err.status || err.response?.status;

    switch (status) {
      case 401:
        return 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.';

      case 403:
        return 'Acesso negado. Entre em contato com o suporte se o problema persistir.';

      case 429:
        return 'Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.';

      case 500:
      case 502:
      case 503:
      case 504:
        return 'Nossos servidores estão temporariamente indisponíveis. Tente novamente em alguns minutos.';

      default:
        return 'Não foi possível fazer login no momento. Tente novamente.';
    }
  }
  // Trata erros de rede
  if (err.name === 'TypeError' && err.message?.includes('fetch')) {
    return 'Problema de conexão. Verifique sua internet e tente novamente.';
  }

  // Verifica se está offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'Sem conexão com a internet. Verifique sua conexão e tente novamente.';
  }

  // Mensagem padrão para erros não identificados
  return 'Não foi possível fazer login no momento. Tente novamente.';
};

/**
 * Converte erros genéricos de API em mensagens amigáveis
 */
export const getApiErrorMessage = (
  error: unknown,
  context: string = 'operação',
): string => {
  const err = error as ErrorWithResponse;

  // Se o erro já tem uma mensagem customizada, usa ela
  if (err.message && !err.message.includes('Erro na requisição:')) {
    return err.message;
  }

  // Trata erros baseados no status HTTP
  if (err.status || (err.response && err.response.status)) {
    const status = err.status || err.response?.status;

    switch (status) {
      case 400:
        return `Dados inválidos. Verifique as informações e tente novamente.`;

      case 401:
        return 'Sua sessão expirou. Faça login novamente.';

      case 403:
        return 'Você não tem permissão para realizar esta ação.';

      case 404:
        return 'Recurso não encontrado.';

      case 409:
        return 'Conflito nos dados. O item pode já existir.';

      case 422:
        return 'Dados inválidos. Verifique as informações fornecidas.';

      case 429:
        return 'Muitas solicitações. Aguarde um momento antes de tentar novamente.';

      case 500:
      case 502:
      case 503:
      case 504:
        return 'Erro interno do servidor. Tente novamente em alguns minutos.';

      default:
        return `Não foi possível completar a ${context}. Tente novamente.`;
    }
  }
  // Trata erros de rede
  if (err.name === 'TypeError' && err.message?.includes('fetch')) {
    return 'Problema de conexão. Verifique sua internet e tente novamente.';
  }

  // Verifica se está offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'Sem conexão com a internet. Verifique sua conexão e tente novamente.';
  }

  // Mensagem padrão
  return `Não foi possível completar a ${context}. Tente novamente.`;
};

/**
 * Cria um objeto de erro padronizado
 */
export const createApiError = (
  status: number,
  message: string,
  originalError?: unknown,
): ApiError => {
  return {
    status,
    message,
    originalError,
  };
};
