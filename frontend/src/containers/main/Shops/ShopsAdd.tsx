import Modal from '../../../components/main/Modal/Modal.tsx';
import React, { ChangeEvent, useState } from 'react';
import { ShopMutation, UploadMutation } from '../../../types.ts';
import { Input } from '../../../components/ui/input.tsx';
import { Textarea } from '../../../components/ui/textarea.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { useAppDispatch } from '../../../app/hook.ts';
import { createShop, fetchShops } from '../../../thunks/shopsThunk.ts';
import FileInput from '../../../components/ui/file.tsx';
import { uploadImage } from '../../../thunks/productsThunk.ts';
import { toast } from 'sonner';

interface Props {
  closeModal: () => void;
}

const ShopsAdd: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const [shopMutation, setShopMutation] = useState<ShopMutation>({
    name: '',
    title: '',
    description: '',
    address: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    image: '',
    slug: '',
    logo: '',
  });

  const [images, setImages] = useState<UploadMutation>({
    image: null,
    logo: null,
    galleryImages: [],
  });

  const onHandleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setShopMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      const file = files[0];
      setImages((prev) => ({ ...prev, [name]: file }));
    }
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    const isLatin = (text: string) => /^[A-Za-z]+$/.test(text.trim());

    e.preventDefault();

    if (!isLatin(shopMutation.slug)) {
      toast.error('Ссылка должна состоять из латинских цимволов');
      return;
    }

    if (
      images.logo &&
      images.image &&
      !shopMutation.logo &&
      !shopMutation.image
    ) {
      const result = await dispatch(uploadImage(images));
      if (uploadImage.fulfilled.match(result)) {
        const shop = {
          ...shopMutation,
          logo: result.payload.logo,
          image: result.payload.image,
        };
        setShopMutation((prev) => ({
          ...prev,
          logo: result.payload.logo,
          image: result.payload.image,
        }));
        await dispatch(createShop(shop));
        await dispatch(fetchShops());
        return;
      }
    } else {
      dispatch(createShop(shopMutation));
    }
  };

  return (
    <div>
      <Modal
        closeModal={closeModal}
        title="Создать магазин"
        className="w-full sm:w-2/4 lg:w-2/6"
      >
        <form
          className="w-full space-y-4 p-4 max-h-[80vh] overflow-y-scroll"
          onSubmit={onSubmit}
        >
          <Input
            name="name"
            placeholder="Название"
            value={shopMutation.name}
            onChange={onHandleChange}
            required
          />
          <Input
            name="slug"
            placeholder="Ссылка"
            value={shopMutation.slug}
            onChange={onHandleChange}
            required
          />
          <Textarea
            name="title"
            placeholder="Загловок"
            value={shopMutation.title}
            onChange={onHandleChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Описание"
            value={shopMutation.description}
            onChange={onHandleChange}
            required
          />
          <Input
            name="address"
            placeholder="Адрес"
            value={shopMutation.address}
            onChange={onHandleChange}
          />
          <Input
            name="phone"
            placeholder="Номер телефона"
            value={shopMutation.phone}
            onChange={onHandleChange}
            required
          />
          <Input
            name="whatsapp"
            placeholder="Whatsapp"
            value={shopMutation.whatsapp}
            onChange={onHandleChange}
            required
          />
          <Input
            name="instagram"
            placeholder="Instagram"
            value={shopMutation.instagram}
            onChange={onHandleChange}
          />
          <div className="flex items-center gap-5">
            <FileInput
              name="logo"
              onChange={onFileChange}
              buttonText="Логотип"
            />
            {images.logo ? (
              <span className="text-sm">{images.logo.name}</span>
            ) : null}
          </div>
          <div className="flex items-center gap-5">
            <FileInput
              name="image"
              onChange={onFileChange}
              buttonText="Главная картинка"
            />
            {images.image ? (
              <span className="text-sm">{images.image.name}</span>
            ) : null}
          </div>
          <Button variant="destructive" className="w-full dark">
            Сохранить
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ShopsAdd;
