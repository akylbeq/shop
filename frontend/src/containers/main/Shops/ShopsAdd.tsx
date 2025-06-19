import Modal from '../../../components/main/Modal/Modal.tsx';
import React from 'react';

interface Props {
  closeModal: () => void;
}

const ShopsAdd: React.FC<Props> = ({ closeModal }) => {
  return (
    <div>
      <Modal closeModal={closeModal} title="Создать магазин">
        <form>132</form>
      </Modal>
    </div>
  );
};

export default ShopsAdd;
