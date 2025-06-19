import { useEffect, useState } from 'react';
import Modal from '../../../components/main/Modal/Modal.tsx';
import { Input } from '../../../components/ui/input.tsx';
import { CategoryMutation } from '../../../types.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import {
  createCategory,
  fetchCategories,
} from '../../../thunks/categoryThunk.ts';
import { selectCategoriesError } from '../../../slices/categorySlice.ts';
import { toast } from 'sonner';

interface Props {
  closeModal: () => void;
}

// Простейшая функция транслитерации
const transliterate = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ё/g, 'e')
    .replace(/й/g, 'y')
    .replace(/ц/g, 'ts')
    .replace(/у/g, 'u')
    .replace(/к/g, 'k')
    .replace(/е/g, 'e')
    .replace(/н/g, 'n')
    .replace(/г/g, 'g')
    .replace(/ш/g, 'sh')
    .replace(/щ/g, 'sch')
    .replace(/з/g, 'z')
    .replace(/х/g, 'h')
    .replace(/ъ/g, '')
    .replace(/ф/g, 'f')
    .replace(/ы/g, 'y')
    .replace(/в/g, 'v')
    .replace(/а/g, 'a')
    .replace(/п/g, 'p')
    .replace(/р/g, 'r')
    .replace(/о/g, 'o')
    .replace(/л/g, 'l')
    .replace(/д/g, 'd')
    .replace(/ж/g, 'zh')
    .replace(/э/g, 'e')
    .replace(/я/g, 'ya')
    .replace(/ч/g, 'ch')
    .replace(/с/g, 's')
    .replace(/м/g, 'm')
    .replace(/и/g, 'i')
    .replace(/т/g, 't')
    .replace(/ь/g, '')
    .replace(/б/g, 'b')
    .replace(/ю/g, 'yu')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
};

const CategoryCreating: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCategoriesError);
  const [categoryMutation, setCategoryMutation] = useState<CategoryMutation>({
    parentId: '',
    name: '',
    slug: '',
    keyword: '',
    descriptionMeta: '',
    isActive: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryMutation((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(createCategory(categoryMutation));
    if (createCategory.fulfilled.match(response)) {
      toast.success('Категория создана');
      await dispatch(fetchCategories());
      closeModal();
    }
    if (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    const generatedSlug = transliterate(categoryMutation.name);
    setCategoryMutation((prev) => ({ ...prev, slug: generatedSlug }));
  }, [categoryMutation.name]);

  return (
    <Modal
      title="Добавление категории"
      className="w-full sm:w-2/4 lg:w-2/6"
      closeModal={closeModal}
    >
      <form className="p-4 w-full space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Название категории"
          type="text"
          name="name"
          value={categoryMutation.name}
          onChange={handleChange}
          required
        />

        <Input
          placeholder="URL-адрес (slug)"
          type="text"
          name="slug"
          value={categoryMutation.slug}
          onChange={handleChange}
          disabled
        />

        <Input
          placeholder="Ключевые слова (через запятую)"
          type="text"
          name="keyword"
          value={categoryMutation.keyword}
          onChange={handleChange}
        />

        <Input
          placeholder="Краткое описание (для SEO)"
          type="text"
          name="descriptionMeta"
          value={categoryMutation.descriptionMeta}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <Input
            type="checkbox"
            name="isActive"
            className="w-5"
            checked={categoryMutation.isActive}
            onChange={() =>
              setCategoryMutation((prev) => ({
                ...prev,
                isActive: !prev.isActive,
              }))
            }
          />
          {categoryMutation.isActive ? 'Видно' : 'Не видно'}
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        >
          Сохранить
        </button>
      </form>
    </Modal>
  );
};

export default CategoryCreating;
