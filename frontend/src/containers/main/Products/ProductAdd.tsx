import Modal from '../../../components/main/Modal/Modal.tsx';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
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
import { fetchCategories } from '../../../thunks/categoryThunk.ts';
import { ProductMutation, UploadMutation } from '../../../types.ts';
import Btn from '../../../components/ui/btn.tsx';
import { LoaderCircle, X } from 'lucide-react';
import {
  createProduct,
  fetchProducts,
  uploadImage,
} from '../../../thunks/productsThunk.ts';
import { toast } from 'sonner';

interface Props {
  closeModal: () => void;
}

const ProductAdd: FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAdminCategories);
  const [loading, setLoading] = useState(false);

  const [productMutation, setProductMutation] = useState<ProductMutation>({
    category: '',
    title: '',
    shortDescription: '',
    description: '',
    originalPrice: '',
    active: false,
    image: '',
    galleryImages: [],
  });

  const [images, setImages] = useState<UploadMutation>({
    image: null,
    galleryImages: [],
  });

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (images.image || images.galleryImages.length > 0) {
      setLoading(true);
      const result = await dispatch(uploadImage(images));
      if (uploadImage.fulfilled.match(result)) {
        setProductMutation((prev) => ({
          ...prev,
          image: result.payload.image,
          galleryImages: result.payload.galleryImages,
        }));
        const product: ProductMutation = {
          ...productMutation,
          image: result.payload.image,
          galleryImages: result.payload.galleryImages,
        };
        await dispatch(createProduct(product));
        setLoading(false);
        toast.success('Продукт сохранен');
        await dispatch(fetchProducts());
        return closeModal();
      }

      toast.error('Возникла ошибка попробуйте позже');
      closeModal();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductMutation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
          <Select
            value={productMutation.category}
            onValueChange={(value) =>
              setProductMutation((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="w-full" value={productMutation.category}>
              {productMutation.category
                ? categories.find((i) => i._id === productMutation.category)
                    ?.name
                : 'Категория'}
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
          <Input
            name="title"
            placeholder="Название"
            onChange={onChange}
            value={productMutation.title}
          />
          <Textarea
            name="shortDescription"
            placeholder="Краткое описанние"
            onChange={onChange}
            value={productMutation.shortDescription}
          />
          <Textarea
            name="description"
            placeholder="описанние"
            onChange={onChange}
            value={productMutation.description}
          />
          <Input
            name="originalPrice"
            type="number"
            placeholder="Цена"
            onChange={onChange}
            value={productMutation.originalPrice}
          />
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="isActive"
              className="w-5"
              checked={productMutation.active}
              onChange={() =>
                setProductMutation((prev) => ({
                  ...prev,
                  active: !prev.active,
                }))
              }
            />
            {productMutation.active ? 'Видно' : 'Не видно'}
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
                className="w-48 h-28 -order-1 rounded-2xl"
                src={URL.createObjectURL(images.image)}
                alt="image"
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
              {images.galleryImages.length > 0
                ? images.galleryImages.map((img, i) => (
                    <div className="relative" key={i + img.name}>
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
                              (f) => img.name !== f.name,
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

export default ProductAdd;
