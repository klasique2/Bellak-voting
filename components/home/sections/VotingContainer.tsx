'use client';

import { useState } from 'react';
import {NomineesSection, CategoryBar} from "@/components"

const VotingContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <CategoryBar 
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect} 
      />
      <NomineesSection selectedCategory={selectedCategory} />
    </>
  );
};

export default VotingContainer;