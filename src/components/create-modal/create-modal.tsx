import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interfaces/FoodData';
import './modal.css';
import { useEffect, useState } from 'react';

interface InputProps {
  label: string;
  value: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateValue: (value: any) => void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      />
    </>
  );
};

interface ModalProps {
  closeModal: () => void;
}

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const { mutate, isSuccess, isLoading } = useFoodDataMutate();

  function submit() {
    const foodData: FoodData = {
      title,
      price,
      image,
    };

    mutate(foodData);
  }

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess, closeModal]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>Cadastre um novo item no cardápio</h2>
          <span
            onClick={closeModal}
            style={{ fontSize: 24, fontWeight: 'bold' }}
          >
            X
          </span>
        </div>

        <form className="input-container" onSubmit={submit}>
          <Input label="title" value={title} updateValue={setTitle} />

          <Input label="price" value={price} updateValue={setPrice} />

          <Input label="image" value={image} updateValue={setImage} />
        </form>
        <button onClick={submit} className="btn-secondary">
          {isLoading ? 'postando...' : 'postar'}
        </button>
      </div>
    </div>
  );
}
