import React, { useState, useRef, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import styles from './Keyboard.module.scss';
import {BsFillXCircleFill, BsSearch} from 'react-icons/bs';

export default function ({ initialValue = "", onChange, onCancel}) {
    const keyboard = useRef();
    const [layout, setLayout] = useState('default');
    const [value, setValue] = useState(initialValue);
    const [isShift, setIsShift] = useState(false);
    const handleShift = (button) => {
        let newLayoutName = layout === "default" ? "shift" : "default";
        if(button === "{shift}"){
            setIsShift(true);
        } else {
            setIsShift(false);
        }

        newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKbChange = (input) => {
        setValue(input)
    }

    const onKeyPress = button => {
        if(isShift){
            handleShift('{shift}');
            setIsShift(false);
        }
        if (button === "{enter}") onChange(value);
        if (button === "{shift}" || button === "{lock}") handleShift(button);
    };

    useEffect(() => {
        keyboard.current.setInput(value);
    }, [value]);

    return <div className={styles.component}>
        <div className={styles.keyboardInner}>
            <div className={styles.top}>
                <div className={styles.keyboardPrev}>
                    {value}
                    {!!value && <div className={styles.clear} onClick={() => setValue("")}><BsFillXCircleFill /> Clear</div>}
                </div>
                <div className={styles.go} onClick={() => onChange(value)}>
                    <BsSearch /> Go 
                </div>
                <div className={styles.cancel} onClick={onCancel}>
                    <BsFillXCircleFill /> Cancel
                </div>
            </div>
            <div className={styles.kb}><Keyboard
                keyboardRef={r => (keyboard.current = r)}
                onChange={onKbChange}
                onKeyPress={onKeyPress}
                layout={{
                    'default': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        'q w e r t y u i o p',
                        'a s d f g h j k l {enter}',
                        '{shift} z x c v b n m {shift}',
                        '{space}'
                    ],
                    'shift': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        'Q W E R T Y U I O P',
                        'A S D F G H J K L {enter}',
                        '{shift} Z X C V B N M {shift}',
                        '{space}'
                    ]
                }}
                layoutName={layout}
            /></div>
        </div>
    </div>
}