import styles from './LearnPack.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useNavigate, useParams} from 'react-router-dom';
import {ChangeEvent, useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import {getCardsPack, setCardPack, updateGradePack} from './learnPackReducer';
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {getCard} from "../../../../utils/smartRandom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {CardType} from "./learnPackApi";

const grades = [
    {value: 1, label: 'Did not know'},
    {value: 2, label: 'Forgot'},
    {value: 3, label: 'A lot of thought'},
    {value: 4, label: 'Confused'},
    {value: 5, label: 'Knew the answer'},
];

export const LearnPack = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [grade, setGrade] = useState(1);
    const [cardId, setCardId] = useState<CardType | null>(null);

    const dispatch = useAppDispatch();

    const {id} = useParams<'id'>();

    const status = useAppSelector(state => state.app.status);
    const cards = useAppSelector(state => state.learnPack.cards);
    const card = useAppSelector(state => state.learnPack.card);
    const packs = useAppSelector(state => state.packList.cardPacks);

    const navigate = useNavigate();

    const handleToggleShowAnswer = () => {
        setShowAnswer(true);
    }

    const handleCancel = () => {
        navigate(`/packs`);
    }

    const handleNext = () => {
        dispatch(updateGradePack({grade: grade, card_id: card._id}));
        setShowAnswer(false);
    }

    const handleChangeGrade = (e: ChangeEvent<HTMLInputElement>) => {
        const gradeNumbers = [1, 2, 3, 4, 5];
        const value = Number(e.currentTarget.value);

        if (gradeNumbers.includes(value)) {
            setGrade(value);
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getCardsPack(id));
        }
    }, [id]);

    useEffect(() => {
        if (cards.length > 0) {
            dispatch(setCardPack(getCard(cards)));
            setCardId(getCard(cards))
        }
    }, [cards]);

    const pack = packs.find(p => p._id === cardId?.cardsPack_id);

    return (

        <div className={styles.wrapper}>
                {status === 'loading'
                    ? (
                        <Typography mt={1} variant="h4" sx={{textAlign: 'center'}}>Loading...</Typography>
                    ) : (
                        <><h3 className={styles.title}>{pack?.name}</h3>
                            <p className={styles.text}><b>Question: </b>{`“${card.question}”`}</p>
                            {showAnswer
                                ? (
                                    <><p className={styles.text}><b>Answer: </b>{`“${card.answer}”`}</p>
                                        <div className={styles.rate}>
                                            <div className={styles.label}>Rate yourself:</div>
                                            <FormControl>
                                                <RadioGroup defaultValue={1}>
                                                    {grades.map(({value, label}, i) => (
                                                        <FormControlLabel
                                                            key={value + i}
                                                            value={value}
                                                            control={<Radio color="secondary" size="small" value={value}
                                                                            onChange={handleChangeGrade}/>}
                                                            label={label}
                                                        />))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.buttons_answer}>
                                            <Button color="secondary" type={'submit'} variant="outlined"
                                                    onClick={handleCancel}>Back to pack list</Button>
                                            <Button color="secondary" type={'submit'} variant="outlined"
                                                    onClick={handleNext}>Next</Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.buttons_question}>
                                        <Button color="secondary" type={'submit'} variant="outlined"
                                                onClick={handleCancel}>Back to pack list</Button>
                                        <Button color="secondary" type={'submit'} variant="outlined"
                                                onClick={handleToggleShowAnswer}>Show answer</Button>
                                    </div>
                                )}
                        </>
                    )}
        </div>
    )
};