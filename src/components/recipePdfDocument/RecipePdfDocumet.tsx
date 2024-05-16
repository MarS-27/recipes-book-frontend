import { type TRecipe } from '@/types/recipe';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { type FC } from 'react';
import { styles } from './styles';

type RecipePdfDocumetProps = { recipe: TRecipe };

const RecipePdfDocumet: FC<RecipePdfDocumetProps> = ({ recipe }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.mainSection}>
          <Image
            style={styles.titleImage}
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${recipe.titleImgPath}`}
          />
          <View style={styles.ingredients}>
            <View style={styles.columnSection}>
              <Text style={styles.boldText}>Ingredients:</Text>
              {recipe.ingredients.map((ingredient) => (
                <Text key={ingredient}>{ingredient}</Text>
              ))}
            </View>
          </View>
        </View>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.columnSection}>
          <Text style={styles.boldText}>Stages:</Text>
          {recipe.stages.map((stage) => (
            <View style={styles.stageItem} key={stage.stageNumber}>
              <View style={styles.stageText}>
                <Text style={styles.boldText}>{stage.stageNumber}.</Text>
                <Text>{stage.description}</Text>
              </View>
              {stage.imgPath ? (
                <Image
                  style={styles.stageImage}
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${stage.imgPath}`}
                />
              ) : null}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default RecipePdfDocumet;
