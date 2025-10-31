'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  itemsPerPage,
  itemsPerPageOptions = [5, 10, 20, 50, 100],
  onItemsPerPageChange,
}) => {
  // Não renderizar paginação se houver apenas uma página
  if (totalPages <= 1) return null;

  // Função para renderizar os botões de paginação de forma limitada
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    // Sempre mostrar a primeira página
    buttons.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`mx-1 rounded-md px-3 py-1 ${
          1 === currentPage
            ? 'bg-blue-700 font-medium text-white hover:bg-blue-800'
            : 'bg-gray-200 font-medium text-black hover:bg-gray-300'
        }`}
      >
        1
      </button>,
    );

    // Calcula o intervalo de páginas a serem exibidas
    let startPage = Math.max(
      2,
      currentPage - Math.floor(maxVisibleButtons / 2),
    );
    const endPage = Math.min(totalPages - 1, startPage + maxVisibleButtons - 1);

    // Ajustar o intervalo se estiver próximo do início ou fim
    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(2, endPage - maxVisibleButtons + 1);
    }

    // Adicionar elipse após a primeira página, se necessário
    if (startPage > 2) {
      buttons.push(
        <span
          key='ellipsis-start'
          className='mx-1 px-2 py-1 font-medium text-black'
        >
          ...
        </span>,
      );
    }

    // Adicionar páginas do intervalo calculado
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 rounded-md px-3 py-1 ${
            i === currentPage
              ? 'bg-blue-700 font-medium text-white hover:bg-blue-800'
              : 'bg-gray-200 font-medium text-black hover:bg-gray-300'
          }`}
        >
          {i}
        </button>,
      );
    }

    // Adicionar elipse antes da última página, se necessário
    if (endPage < totalPages - 1) {
      buttons.push(
        <span
          key='ellipsis-end'
          className='mx-1 px-2 py-1 font-medium text-black'
        >
          ...
        </span>,
      );
    }

    // Sempre mostrar a última página, se for diferente da primeira
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`mx-1 rounded-md px-3 py-1 ${
            totalPages === currentPage
              ? 'bg-blue-700 font-medium text-white hover:bg-blue-800'
              : 'bg-gray-200 font-medium text-black hover:bg-gray-300'
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    return buttons;
  };

  // Função para lidar com a mudança de itens por página
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(Number(e.target.value));
    }
  };

  return (
    <div
      className={`mt-6 flex flex-col items-center justify-between sm:flex-row ${className}`}
    >
      {/* Seletor de itens por página - renderizado apenas se a prop onItemsPerPageChange for fornecida */}
      {onItemsPerPageChange && (
        <div className='mb-4 flex items-center sm:mb-0'>
          <span className='mr-2 text-sm font-medium text-black'>
            Itens por página:
          </span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className='rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Botões de navegação entre páginas - renderizado apenas se totalPages > 1 */}
      {totalPages > 1 && (
        <div className='flex justify-center'>
          <nav className='flex items-center'>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='mr-2 rounded-md bg-gray-200 px-3 py-1 font-medium text-black hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-40'
            >
              Anterior
            </button>

            {renderPageButtons()}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='ml-2 rounded-md bg-gray-200 px-3 py-1 font-medium text-black hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-600 disabled:opacity-40'
            >
              Próxima
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Pagination;
