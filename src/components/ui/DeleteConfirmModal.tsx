'use client';

import React from 'react';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
  cancelText?: string;
  confirmText?: string;
}

/**
 * Componente reutilizável para confirmação de exclusão.
 */
const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title = "Confirmar exclusão",
  message = "Tem certeza que deseja excluir este item?",
  onClose,
  onConfirm,
  isLoading = false,
  cancelText = "Cancelar",
  confirmText = "Excluir",
}) => {  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="p-4">
        <p className="mb-4 text-gray-800 font-medium">{message}</p>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
