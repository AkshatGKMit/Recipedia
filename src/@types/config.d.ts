interface BottomTabButtonProps {
  icon: string;
  isActive: boolean;
  onPress: () => void;
}

interface DialogRef {
  show: (params: DialogParams) => void;
  hide: () => void;
}
