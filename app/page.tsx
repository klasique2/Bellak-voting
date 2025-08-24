import { Hero, VotingContainer } from '@/components';
import { getCategories, getAllNominees } from './lib/votes';

const HomePage = async () => {
  const [categories, allNominees] = await Promise.all([ 
    getCategories(),
    getAllNominees()
  ]);

  return (
    <div>
      <Hero />
      <VotingContainer 
        categories={categories.results} 
        allNominees={allNominees}
      />
    </div>
  );
};

export default HomePage;