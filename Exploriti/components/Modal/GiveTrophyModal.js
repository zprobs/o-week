import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity, Text,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';

import Svg from 'react-native-svg';
import ImgBanner from '../ReusableComponents/ImgBanner';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const { colours } = Theme.light;
import Trophy from '../../assets/svg/trophy.svg';
import Slider from '@react-native-community/slider';
import Fonts from '../../theme/Fonts';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useMutation } from '@apollo/react-hooks';
import { AWARD_TROPHIES } from '../../graphql';
const { FontWeights, FontSizes } = Fonts;


const GiveTrophyModal = React.forwardRef(({ selected, onClose }, ref) => {
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [score, setScore] = useState(1);

  const [award] = useMutation(AWARD_TROPHIES)

  const onDone = async () => {
    setIsUploading(true);
    const objects = [];
    selected.forEach((id)=>objects.push({
      groupId: id,
      trophy: {
        data: {
          description: description,
          name: name,
          score: score
        }
      }
    }))
    award({variables: {objects: objects}}).then(()=>{
      setIsUploading(false);
      ref.current.close();
    }).catch(e=>console.log(e))
  };

  console.log('selected', selected)

  return (
    <Modalize
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        bounces: false,
      }}
      modalTopOffset={110}
      onClose={onClose}>
      <View style={{ paddingHorizontal: 20 }}>
        <ModalHeader
          heading="Award a Trophy"
          subHeading="Recognize thier achievements!"
        />
        <View style={styles.trophyIcon}>
          <Trophy width={WIDTH*0.3} height={WIDTH*0.3} fill={ThemeStatic.gold} />
        </View>
        <FormInput
          value={name}
          onChangeText={setName}
          label={'Name'}
          characterRestriction={30}
          placeholder={'example: Scavenger Hunt Champs'}
          ref={null}
        />
        <FormInput
          value={description}
          onChangeText={setDescription}
          label={'Description'}
          characterRestriction={120}
          placeholder={'example: A record time of 5:22, Congrats!'}
          ref={null}
        />
        <Text style={styles.sliderTextStyle}>{`Score: ${score}`}</Text>
        <Slider
          style={{width: '90%', height: 60, alignSelf: 'center'}}
          minimumValue={1}
          maximumValue={300}
          minimumTrackTintColor={ThemeStatic.gold}
          maximumTrackTintColor={ThemeStatic.text02}
          thumbTintColor={ThemeStatic.gold}
          value={score}
          onValueChange={setScore}
          step={1}
        />
        <ButtonColour label={'Award'} colour={ThemeStatic.accent} onPress={onDone} loading={isUploading} loadColour={'white'} light={true} containerStyle={{marginVertical: 30}}/>
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  trophyIcon: {
    alignItems: 'center',
    marginVertical: 25
  },
  sliderTextStyle: {
    ...FontWeights.Regular,
    color: colours.accent,
    fontSize: FontSizes.Label.fontSize,
    marginVertical: 10,
  }
});

export default GiveTrophyModal;
