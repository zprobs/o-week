import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ModalHeader from './ModalHeader';
import { Theme, ThemeStatic } from '../../theme/Colours';
import FormInput from '../ReusableComponents/FormInput';
const WIDTH = Dimensions.get('window').width;
const { colours } = Theme.light;
import Trophy from '../../assets/svg/trophy.svg';
import Slider from '@react-native-community/slider';
import Fonts from '../../theme/Fonts';
import ButtonColour from '../ReusableComponents/ButtonColour';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { AWARD_TROPHIES, GET_GROUPS_MEMBERS, SEND_NOTIFICATIONS } from '../../graphql';
import { showMessage } from 'react-native-flash-message';
import { NotificationTypes, processError, processWarning } from '../../context';
const { FontWeights, FontSizes } = Fonts;

const GiveTrophyModal = React.forwardRef(({ selected, onClose }, ref) => {
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [score, setScore] = useState(1);
  const [isOpen, setIsOpen] = useState(false)

  const [award, {error}] = useMutation(AWARD_TROPHIES);
  const [sendNotifications] = useMutation(SEND_NOTIFICATIONS);
  const [getMembers, {data, loading, error: membersError}] = useLazyQuery(GET_GROUPS_MEMBERS)
  if (error) {
   processError(error, 'Cannot Award Trophy')
  }

  console.log('members', data);


  useEffect(()=>{
    if (isOpen && selected) {
      getMembers({variables: {groupIds: selected}})
    }
  }, [selected])


  if (membersError) processWarning(membersError, "Network Error")

  const onDone = async () => {
    setIsUploading(true);
    const objects = [];
    selected.forEach((id) =>
      objects.push({
        groupId: id,
        trophy: {
          data: {
            description: description,
            name: name,
            score: score,
          },
        },
      }),
    );
    award({ variables: { objects: objects } })
      .then(() => {
        showMessage({
          message: 'You may have to restart the app to see the trophy on the group screen',
          type: 'info',
          icon: 'auto',
        });
        setIsUploading(false);
        ref.current.close();
      })
      .catch((e) => console.log(e));
    selected.forEach(id => {
      const group = data.groups.find(g => g.id === id)
      console.log('group', group);
      let userIDs = [];
      group.members.forEach(m => {
        userIDs.push({userId: m.userId})
      })
      sendNotifications({
        variables: {
          type: NotificationTypes.trophyAwarded,
          typeId: id,
          recipients: userIDs,
        },
      });
      userIDs = [];
    })


  };

  return (
    <Modalize
      ref={ref}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        bounces: false,
      }}
      modalTopOffset={110}
      onOpen={()=>setIsOpen(true)}
      onClose={()=> {
        setIsOpen(false);
        onClose && onClose();
      }}>
      <View style={{ paddingHorizontal: 20 }}>
        <ModalHeader
          heading="Award a Trophy"
          subHeading="Recognize their achievements!"
        />
        <View style={styles.trophyIcon}>
          <Trophy
            width={WIDTH * 0.3}
            height={WIDTH * 0.3}
            fill={ThemeStatic.gold}
          />
        </View>
        <FormInput
          value={name}
          onChangeText={setName}
          label={'Name'}
          characterRestriction={30}
          placeholder={'example: Scavenger Hunt Champs'}
          ref={null}
          autoCapitalize
        />
        <FormInput
          value={description}
          onChangeText={setDescription}
          label={'Description'}
          characterRestriction={120}
          placeholder={'example: A record time of 5:22, Congrats!'}
          ref={null}
          autoCapitalize
        />
        <Text style={styles.sliderTextStyle}>{`Score: ${score}`}</Text>
        <Slider
          style={{ width: '90%', height: 60, alignSelf: 'center' }}
          minimumValue={1}
          maximumValue={300}
          minimumTrackTintColor={ThemeStatic.gold}
          maximumTrackTintColor={ThemeStatic.text02}
          thumbTintColor={ThemeStatic.gold}
          value={score}
          onValueChange={setScore}
          step={1}
        />
        <ButtonColour
          label={'Award'}
          colour={ThemeStatic.accent}
          onPress={onDone}
          loading={loading || isUploading}
          loadColour={'white'}
          light={true}
          containerStyle={{ marginVertical: 30 }}
        />
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
    marginVertical: 25,
  },
  sliderTextStyle: {
    ...FontWeights.Regular,
    color: colours.accent,
    fontSize: FontSizes.Label.fontSize,
    marginVertical: 10,
  },
});

export default GiveTrophyModal;
