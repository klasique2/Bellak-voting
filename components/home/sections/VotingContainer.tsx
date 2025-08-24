'use client';

import { useState } from 'react';
import {NomineesSection, CategoryBar} from "@/components"
import { Category, Nominee } from '@/types/general';

type Props = {
    categories: Category[];
    allNominees: Nominee[];
};

const VotingContainer = ({ categories, allNominees }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <CategoryBar 
        categories={categories}
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect} 
      />
      <NomineesSection 
        selectedCategory={selectedCategory} 
        allNominees={allNominees}
      />
    </>
  );
};

export default VotingContainer;