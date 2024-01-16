import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Flex } from 'antd';

type ActionButtonsPropType = {
    onEditClick: React.MouseEventHandler<HTMLElement>;
    onDeleteClick: React.MouseEventHandler<HTMLElement>;
};

function ActionButtons({ onEditClick, onDeleteClick }: ActionButtonsPropType) {
    return (
        <Flex gap="small" wrap="nowrap">
            <Button
                type="primary"
                icon={<EditTwoTone twoToneColor="#ffffff" />}
                onClick={onEditClick}
            >
                Edit
            </Button>
            <Button
                danger
                icon={<DeleteTwoTone twoToneColor="#fc333e" />}
                onClick={onDeleteClick}
            >
                Delete
            </Button>
        </Flex>
    );
}

export default ActionButtons;
