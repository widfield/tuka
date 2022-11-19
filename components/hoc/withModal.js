import React, { useState, useEffect, useRef } from "react";
import { Dimensions, View, TouchableWithoutFeedback } from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";

const withModal = (WrappedComponent) => (props) => {
  const [modal, setModal] = useState(null);

  const refRBSheet = useRef();

  const handleModalPress = (e) => {
    if (modal !== null) {
      e.stopPropagation();
      setModal(null);
      refRBSheet.current.close();
      if (modal?.options?.onPress) {
        modal?.options?.onPress();
      }
    }
  };
  useEffect(() => {
    if (modal !== null) {
      refRBSheet.current.open();
    }
  }, [modal]);

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get("window").height / 2}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            display: "none",
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "transparent",
            borderTop: "1px solid black",
          },
        }}
        animationType="slide"
        onClose={() => setModal(null)}
        {...modal?.options}
      >
        <TouchableWithoutFeedback onPressOut={handleModalPress}>
          <View>{modal?.content}</View>
        </TouchableWithoutFeedback>
      </RBSheet>
      <WrappedComponent setModal={setModal} {...props} />
    </View>
  );
};

export default withModal;
