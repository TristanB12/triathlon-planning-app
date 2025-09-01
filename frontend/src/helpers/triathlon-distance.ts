import sprintIllustration from 'src/assets/triathlon-sprint-illustration.png';
import olympicIllustration from 'src/assets/triathlon-olympic-illustration.png';
import halfIronmanIllustration from 'src/assets/triathlon-halfironman-illustration.png';
import ironmanIllustration from 'src/assets/triathlon-ironman-illustration.png';

export const distanceTypeConfigs = {
  SPRINT: {
    label: 'Sprint',
    color: 'yellow-1',
    illustration: sprintIllustration
  },
  OLYMPIC: {
    label: 'Olympic',
    color: 'blue-1',
    illustration: olympicIllustration
  },
  HALF_IRONMAN: {
    label: 'Half Ironman',
    color: 'green-1',
    illustration: halfIronmanIllustration
  },
  IRONMAN: {
    label: 'Ironman',
    color: 'red-1',
    illustration: ironmanIllustration
  }
};

export const distanceTypeConfigsArray = Object.entries(distanceTypeConfigs).map(([value, config]) => ({
  value,
  label: config.label,
  color: config.color,
  illustration: config.illustration
}));