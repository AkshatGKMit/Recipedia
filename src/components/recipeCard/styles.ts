import { StyleSheet } from 'react-native';

import { Colors, FontFamily, FontSize } from '@themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.white,
    padding: 10,
    shadowColor: Colors.black,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    flex: 2,
    width: '100%',
    aspectRatio: 3 / 2,
    borderRadius: 12,
  },
  classifications: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: 10,
    gap: 10,
  },
  detailsWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: FontFamily.normal.black,
    fontSize: FontSize.titleMedium,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 18,
  },
  subtitle: {
    fontSize: FontSize.labelMedium,
    textAlign: 'center',
    color: Colors.greyShades.shade700,
  },
  favoriteIcon: {
    marginVertical: 'auto',
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    padding: 2,
  },
  icon: {
    fontSize: FontSize.headlineSmall,
  },
  shimmerContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 3 / 2,
    borderRadius: 12,
    backgroundColor: Colors.grey,
  },
});

export default styles;
