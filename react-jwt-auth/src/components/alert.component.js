import React, { useState } from 'react';
import { Alert as BaseAlert } from 'reactstrap';
import PropTypes from 'prop-types';

const Alert = (props) => {
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);

    return (
        <BaseAlert color={props.color} isOpen={visible} toggle={onDismiss}>
            {props.message}
        </BaseAlert>
    );
}

Alert.propTypes = {
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default Alert;