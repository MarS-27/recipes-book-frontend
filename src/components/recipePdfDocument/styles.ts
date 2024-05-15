import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto-bold',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
});

Font.register({
  family: 'Roboto-regular',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto-regular',
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: '30px',
    fontSize: '12px',
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: '15px',
  },
  columnSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '5px',
  },
  boldText: {
    fontFamily: 'Roboto-bold',
    textDecoration: 'underline',
  },
  title: {
    fontFamily: 'Roboto-bold',
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '5px',
  },
  description: {
    marginBottom: '15px',
  },
  titleImage: {
    borderRadius: '8px',
    width: '240px',
  },
  stageItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '5px',
    borderBottom: '1px solid black',
  },
  stageText: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: '10px',
    width: '500px',
  },
  stageImage: {
    width: '200px',
    minWidth: '200px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover',
    alignSelf: 'center',
  },
});
