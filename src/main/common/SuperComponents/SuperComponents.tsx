import react from 'React';
import SuperInputText from "./c1-SuperInputText/SuperInputText";
import SuperButton from "./c2-SuperButton/SuperButton";
import SuperCheckbox from "./c3-SuperCheckbox/SuperCheckbox";
import style from './SuperComponents.module.css'


const SuperComponents = () => {
    return (
        <>
            <h2>Super Components</h2>
            <div className={style.container}>
                <SuperInputText />
                <SuperButton style={{width: '20%'}}>Click me!</SuperButton>
                <SuperCheckbox/>
            </div>
        </>
    )
}

export default SuperComponents