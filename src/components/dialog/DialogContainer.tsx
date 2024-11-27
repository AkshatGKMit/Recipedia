import { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal, Pressable } from 'react-native';

import { Colors, globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

import Styles from './styles';

function renderData(data: DialogParams, hideModal: () => void, styles: any) {
  const { backdropColor, borderRadius, child } = data;

  const dialogStyles = [
    styles.dialog,
    globalStyles.columnCenter,
    { backgroundColor: backdropColor, borderRadius },
  ];

  return (
    <Pressable
      onPress={() => {
        hideModal();
      }}
    >
      <View style={dialogStyles}>{child}</View>
    </Pressable>
  );
}

const DialogContainer = forwardRef<DialogRef>((_, ref) => {
  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState<DialogParams | null>(null);

  function showModal(params: DialogParams) {
    const { isDismissible = true, backdropColor = colorWithOpacity(Colors.black, 0.5) } = params;

    setData({ ...params, isDismissible, backdropColor });
    setVisible(true);
  }

  function hideModal() {
    setVisible(false);
    setData(null);
  }

  useImperativeHandle(ref, () => ({
    show: (params: DialogParams) => showModal(params),
    hide: hideModal,
  }));

  const styles = Styles();

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      visible={isVisible}
    >
      {data && renderData(data, hideModal, styles)}
    </Modal>
  );
});

export default DialogContainer;
