import Modal from '../../../components/main/Modal/Modal.tsx';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Input } from '../../../components/ui/input.tsx';
import { Textarea } from '../../../components/ui/textarea.tsx';
import FileInput from '../../../components/ui/file.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../../components/ui/select.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectAdminCategories } from '../../../slices/categorySlice.ts';
import { Product, UploadMutation } from '../../../types.ts';
import Btn from '../../../components/ui/btn.tsx';
import { LoaderCircle, X } from 'lucide-react';
import {
  editProduct,
  fetchProducts,
  uploadImage,
} from '../../../thunks/productsThunk.ts';
import { toast } from 'sonner';

interface Props {
  closeModal: () => void;
  product: Product;
}

const ProductEdit: FC<Props> = ({ closeModal, product }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAdminCategories);
  const [loading, setLoading] = useState(false);

  const [productEditing, setProductEditing] = useState<Product>(product);

  const [images, setImages] = useState<UploadMutation>({
    image: null,
    galleryImages: [],
  });

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (images.image || images.galleryImages.length > 0) {
      const result = await dispatch(uploadImage(images));
      if (uploadImage.fulfilled.match(result)) {
        const product: Product = {
          ...productEditing,
          image: result.payload.image || productEditing.image,
          galleryImages: [
            ...(productEditing.galleryImages || []),
            ...(result.payload.galleryImages || []),
          ],
        };
        await dispatch(editProduct(product));
        setLoading(false);
        toast.success('Продукт сохранен');
        await dispatch(fetchProducts());
        return closeModal();
      }
    } else {
      await dispatch(editProduct(productEditing));
      toast.success('Продукт сохранен');
      await dispatch(fetchProducts());
      setLoading(false);
      return closeModal();
    }

    toast.error('Возникла ошибка попробуйте позже');
    closeModal();
    setLoading(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductEditing((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (files) {
      const newFiles = Array.from(files);
      setImages((prev) => ({
        ...prev,
        [name]:
          name === 'galleryImages'
            ? [...prev.galleryImages, ...newFiles]
            : newFiles[0],
      }));
    }
  }, []);

  console.log(product);

  console.log(productEditing);

  return (
    <div>
      <Modal
        closeModal={closeModal}
        title="Добавить продукт"
        className="w-full sm:w-2/4 lg:w-2/6"
      >
        <form
          className="p-4 w-full space-y-4 max-h-[80vh] overflow-y-scroll"
          onSubmit={onSubmit}
        >
          <label>Категория</label>
          <Select
            value={productEditing.category}
            onValueChange={(value) =>
              setProductEditing((prev) => ({
                ...prev,
                category: value,
              }))
            }
          >
            <SelectTrigger className="w-full" value={productEditing.category}>
              {productEditing.category
                ? categories.find((c) => c._id === productEditing.category)
                    ?.name
                : ''}
            </SelectTrigger>
            <SelectContent>
              {categories?.length > 0
                ? categories.map((c) => (
                    <SelectItem value={c._id} key={c._id}>
                      {c.name}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
          <label>Название</label>
          <Input
            name="title"
            placeholder="Название"
            onChange={onChange}
            value={productEditing.title}
          />
          <label>Краткое описание</label>
          <Textarea
            name="shortDescription"
            placeholder="Краткое описанние"
            onChange={onChange}
            value={productEditing.shortDescription}
          />
          <label>Описание</label>
          <Textarea
            name="description"
            placeholder="описанние"
            onChange={onChange}
            value={productEditing.description}
          />
          <label>Цена</label>
          <Input
            name="originalPrice"
            type="number"
            placeholder="Цена"
            onChange={onChange}
            value={productEditing.originalPrice}
          />
          <label>Цена скидки</label>
          <Input
            name="discountPrice"
            type="number"
            placeholder="Цена"
            onChange={onChange}
            value={productEditing.discountPrice}
          />
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="isActive"
              className="w-5"
              checked={productEditing.active}
              onChange={() =>
                setProductEditing((prev) => ({ ...prev, active: !prev.active }))
              }
            />
            {productEditing.active ? 'Видно' : 'Не видно'}
          </label>
          <div className="flex flex-col gap-1">
            <FileInput
              buttonText="Изображение"
              onChange={onFileChange}
              name="image"
              className="w-full bg-black"
            />
            {images.image ? (
              <img
                className="w-48 h-36 -order-1 rounded-2xl"
                src={URL.createObjectURL(images.image)}
                alt="image"
              />
            ) : productEditing.image ? (
              <img
                src={productEditing.image}
                className="w-48 h-36 -order-1 rounded-2xl"
                alt="img"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-1">
            <FileInput
              buttonText="Галерея"
              onChange={onFileChange}
              multiple={true}
              name="galleryImages"
              className="w-full"
            />
            <div className="flex gap-1 -order-2 flex-wrap">
              {productEditing.galleryImages.length > 0
                ? productEditing.galleryImages.map((img, i) => (
                    <div className="relative" key={i + img}>
                      <img
                        src={img}
                        alt="gallery img"
                        className="w-32 h-32"
                        key={i}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 rounded-2xl px-1"
                        onClick={() =>
                          setProductEditing((prev) => ({
                            ...prev,
                            galleryImages: productEditing.galleryImages.filter(
                              (f) => f !== img,
                            ),
                          }))
                        }
                      >
                        <X
                          width={16}
                          height={22}
                          color="#ffffff"
                          strokeWidth={4}
                        />
                      </button>
                    </div>
                  ))
                : null}
              <div>
                <div className="flex gap-1 -order-2 flex-wrap">
                  {images.galleryImages.length > 0
                    ? images.galleryImages.map((img, i) => (
                        <div className="relative" key={i}>
                          <img
                            src={URL.createObjectURL(img)}
                            alt="gallery img"
                            className="w-32 h-32"
                            key={i}
                          />
                          <button
                            className="absolute top-1 right-1 bg-red-500 rounded-2xl px-1"
                            onClick={() =>
                              setImages((prev) => ({
                                ...prev,
                                galleryImages: images.galleryImages.filter(
                                  (f) => f.name !== img.name,
                                ),
                              }))
                            }
                          >
                            <X
                              width={16}
                              height={22}
                              color="#ffffff"
                              strokeWidth={4}
                            />
                          </button>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <Btn
            variant="secondary"
            className="w-full flex gap-1 items-center"
            disabled={loading}
          >
            Сохранить
            {loading && <LoaderCircle className="animate-spin" width={18} />}
          </Btn>
        </form>
      </Modal>
    </div>
  );
};

export default ProductEdit;
