import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import GradientScreen from '@components/gradientScreen';
import Snackbar from '@components/snackBar';
import RecipeList from '@components/recipeList';
import { _get } from '@network/instanceMethods';
import ApiConstants from '@network/apiConstants';

import FoodFacts from './FoodFacts';
import DashboardHeader from './DashboardHeader';
import FoodJoke from './Joke';
import Styles from './styles';

const Dashboard = () => {
  const [trivia, setTrivia] = useState<string>('');
  const [joke, setJoke] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipes>([]);
  const [includedTags, setIncludedTags] = useState<FoodTags>([]);
  const [excludedTags, setExcludedTags] = useState<FoodTags>([]);

  const {
    getRandomFoodTrivia: randomFoodTriviaEndpoint,
    getRandomFoodJoke: randomFoodJokeEndpoint,
    getRandomRecipe: randomRecipeEndpoint,
  } = ApiConstants.endpoints;

  const getTrivia = async () => {
    const triviaResponse = await _get<GetRandomFacts>(randomFoodTriviaEndpoint);

    if (triviaResponse.success) {
      setTrivia(triviaResponse.responseData.text);
    }
  };

  const getJoke = async () => {
    const jokeResponse = await _get<GetRandomFacts>(randomFoodJokeEndpoint);

    if (jokeResponse.success) {
      setJoke(jokeResponse.responseData.text.replaceAll('\n', '\n\n'));
    }
  };

  const getRandomRecipes = async () => {
    const recipesResponse = await _get<GetRandomRecipes>(randomRecipeEndpoint, {
      params: {
        number: 2,
        'include-tags': includedTags.join(','),
        'exclude-tags': excludedTags.join(','),
      },
    });

    if (!recipesResponse.success) {
      const { code, message } = recipesResponse.error;
      Snackbar.show({ heading: `Error ${code}`, text: message, duration: 10000 });
      return;
    }

    setRecipes(recipesResponse.responseData.recipes);
  };

  useEffect(() => {
    getRandomRecipes();
  }, [includedTags, excludedTags]);

  useEffect(() => {
    getTrivia();
    getJoke();
  }, []);

  const onPressTag = (tag: FoodTag) => {
    let newTags: FoodTag[];

    if (excludedTags.includes(tag)) {
      setExcludedTags(excludedTags.filter((prevTag) => tag !== prevTag));
      return;
    }

    if (includedTags.includes(tag)) {
      newTags = includedTags.filter((prevTag) => tag !== prevTag);
    } else {
      newTags = [...includedTags, tag];
    }

    setIncludedTags(newTags);
  };

  const onLongPressTag = (tag: FoodTag) => {
    let newTags: FoodTag[];

    if (includedTags.includes(tag))
      setIncludedTags(includedTags.filter((prevTag) => tag !== prevTag));

    if (excludedTags.includes(tag)) {
      newTags = excludedTags.filter((prevTag) => tag !== prevTag);
    } else {
      newTags = [...excludedTags, tag];
    }

    setExcludedTags(newTags);
  };

  const styles = Styles();

  return (
    <GradientScreen style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <DashboardHeader />
        <RecipeList {...{ recipes, onPressTag, onLongPressTag, includedTags, excludedTags }} />
      </ScrollView>
      <FoodFacts text={trivia} />
      <FoodJoke text={joke} />
    </GradientScreen>
  );
};

export default Dashboard;
