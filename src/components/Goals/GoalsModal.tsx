import React, { useState, useEffect } from 'react'
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { ModalContainer } from '../Expenses/styled'
import { preventPropagationOnEnter } from '../Expenses/utils'
import {
    handleAmountChange,
    handleFinishedDateChange,
    isReachabilityValid,
} from './GoalsFunctions'
import { GoalDataInterface } from './GoalsInterfaces'

type Props = {
    onAddGoal: (value: GoalDataInterface) => void;
    onUpdateGoal: (value: GoalDataInterface) => void;
    goalToEdit: GoalDataInterface | null | undefined ;
    editIndex: number | null;
    statusModal: boolean;
    setStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
    handlerCancelEdit: () => void;
};

const GoalsModal = ({
    onAddGoal,
    onUpdateGoal,
    goalToEdit,
    editIndex,
    statusModal,
    setStatusModal,
    handlerCancelEdit,
}: Props) => {
    const [goalData, setGoalData] = useState<GoalDataInterface>({
        goal: '',
        sub_goal: 'NA',
        target_metric: 0,
        current_metric: 0,
        reachability_in_months: 0,
        reachability_in_years: 0,
        started: new Date(dayjs().format('YYYY-MM-DD')), // Initialize with the current date
        finished: new Date(dayjs().format('YYYY-MM-DD')), // Initialize with the current date
        comments: '',
        plannedFinish: dayjs().format('YYYY-MM-DD'), // Initialize with the current date
        planned_start: new Date(dayjs().format('YYYY-MM-DD')), // Initialize with the current date
        prefered_value_of_balance: '',
        user: 5,
        balance: 0,
    })

    useEffect(() => {
        if (goalToEdit) {
            // Convert date strings to 'YYYY-MM-DD' format
            const convertToYYYYMMDD = (dateString: string) => {
                const [day, month, year] = dateString.split('/')
                const date = dayjs(new Date(`${year}/${month}/${day}`)).format('YYYY-MM-DD')
                return date
            }

            const {
                planned_start,
                started,
                finished,
                reachability_in_months,
                reachability_in_years,
                current_metric,
                ...restGoalToEdit
            } = goalToEdit

            const plannedStartDate = convertToYYYYMMDD(new Date(planned_start).toLocaleDateString())
            const startedDate = convertToYYYYMMDD(new Date(started).toLocaleDateString())
            const finishedDate = convertToYYYYMMDD(new Date(finished).toLocaleDateString())

            setGoalData((prevData) => ({
                ...prevData,
                ...restGoalToEdit,
                planned_start: new Date(plannedStartDate),
                started: new Date(startedDate),
                finished: new Date(finishedDate),
                current_metric: current_metric,
                plannedFinish: dayjs().format('YYYY-MM-DD'),
                reachability_in_months: reachability_in_months,
                reachability_in_years: reachability_in_years,
            }))
        } else {
            // Initialize with default values
            const initState: GoalDataInterface = {
                goal: '',
                sub_goal: 'NA',
                target_metric: 0,
                current_metric: 0,
                reachability_in_months: 0,
                reachability_in_years: 0,
                started: new Date(dayjs().format('YYYY-MM-DD')), // Initialize with the current date
                finished: new Date(dayjs().format('YYYY-MM-DD')), // Initialize with the current date
                comments: '',
                plannedFinish: dayjs().format('YYYY-MM-DD'), // Initialize with the current date
                planned_start: new Date(dayjs().format('YYYY-MM-DD')), // Initialize with the current date
                prefered_value_of_balance: '',
                user: 5,
                balance: 0,
            }

            setGoalData(initState)
        }
    }, [goalToEdit, statusModal])

    const handleClickOpen = () => {
        setStatusModal(true)
    }

    const handleClose = () => {
        setStatusModal(false)
        if (editIndex !== null) {
            handlerCancelEdit()
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { current_metric, target_metric } = goalData
        const balance =
            current_metric.toString().includes('%') && target_metric.toString().includes('%')
                ? `${Number(target_metric?.toString().split('%')[0]) - Number(current_metric.toString()?.split('%')[0])}%`
                : (parseInt(target_metric.toString()) - parseInt(current_metric.toString())).toString()

        const balanceNumber = parseInt(balance.toString())

        if (editIndex !== null) {
            onUpdateGoal({ ...goalData, id: 1 })
        } else {
            onAddGoal({
                ...goalData,
                balance: balanceNumber,
            })
        }

        Swal.fire({
            icon: 'success',
            title: `${editIndex !== null ? 'The goal was updated correctly' : 'The goal was added correctly'}`,
            timer: 2300,
            timerProgressBar: true,
        })

        handleClose()
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target
        if (name === 'reachability_in_months' || name === 'reachability_in_years') {
            if (!isReachabilityValid(value)) return
        }
        if (name === 'finished') {
            if (!handleFinishedDateChange(new Date(value), new Date(goalData.started))) return
        }
        if (name === 'target_metric' || name === 'current_metric') {
            if (!handleAmountChange(value)) return
        }

        setGoalData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleChangeMouseEvent = (evt: React.MouseEvent<HTMLElement>) => {
        const value = evt.currentTarget.getAttribute('value')
        if (value) {
            setGoalData((prev) => ({
                ...prev,
                prefered_value_of_balance: value,
            }))
        }
    }

    return (
        <>
            <ModalContainer>
                <Button variant="contained" color="primary" onClick={handleClickOpen} data-testid="add-goal">
                    Add Goal
                </Button>

                <Dialog
                    open={statusModal}
                    onClose={() => {
                        handleClose()
                    }}
                >
                    <DialogTitle>{editIndex !== null ? 'Edit Goal' : 'Add Goal'}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="body1">Provide the Goal:</Typography>
                            <TextField
                                value={goalData.goal}
                                onChange={handleChange}
                                onKeyDown={preventPropagationOnEnter}
                                required
                                fullWidth
                                data-testid="goal"
                                name="goal"
                            />
                            <Typography variant="body1">Provide the Target Metric:</Typography>
                            <TextField
                                value={goalData.target_metric}
                                onChange={handleChange}
                                onKeyDown={preventPropagationOnEnter}
                                required
                                fullWidth
                                data-testid="target-metric"
                                name="target_metric"
                                type="number"
                            />
                            <Typography variant="body1">Provide the Current Metric:</Typography>
                            <TextField
                                value={goalData.current_metric}
                                onChange={handleChange}
                                onKeyDown={preventPropagationOnEnter}
                                required
                                fullWidth
                                data-testid="current-metric"
                                name="current_metric"
                                type="number"
                            />
                            <Typography variant="body1">Provide the Reachability in Months:</Typography>
                            <TextField
                                value={goalData.reachability_in_months}
                                onChange={handleChange}
                                onKeyDown={preventPropagationOnEnter}
                                required
                                fullWidth
                                data-testid="reachability-in-months"
                                name="reachability_in_months"
                                type="number"
                            />
                            <Typography variant="body1">Provide the Reachability in Years:</Typography>
                            <TextField
                                value={goalData.reachability_in_years}
                                onChange={handleChange}
                                onKeyDown={preventPropagationOnEnter}
                                required
                                fullWidth
                                data-testid="reachability-in-years"
                                name="reachability_in_years"
                                type="number"
                            />
                            <Typography variant="body1">Choose the Started Date:</Typography>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        data-testid="start-date"
                                        defaultValue={dayjs(goalData.started)}
                                        onChange={(value) =>
                                            setGoalData((prev) => ({ ...prev, started: new Date(dayjs(value?.toDate()).format('YYYY-MM-DD')) }))
                                        }
                                    />
                                </LocalizationProvider>
                            </div>
                            <Typography variant="body1">Choose the Finished Date:</Typography>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        data-testid="finished-date"
                                        defaultValue={dayjs(goalData.finished)}
                                        onChange={(value) =>
                                            setGoalData((prev) => ({ ...prev, finished: new Date(dayjs(value?.toDate()).format('YYYY-MM-DD')) }))
                                        }
                                    />
                                </LocalizationProvider>
                            </div>
                            <Typography variant="body1">Choose the Planned Start Date:</Typography>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        data-testid="planned-start-date"
                                        defaultValue={dayjs(goalData.planned_start)}
                                        onChange={(value) =>
                                            setGoalData((prev) => ({ ...prev, planned_start: new Date(dayjs(value?.toDate()).format('YYYY-MM-DD')) }))
                                        }
                                    />
                                </LocalizationProvider>
                            </div>
                            <Typography variant="body1">Choose the Planned Finish Date:</Typography>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        data-testid="planned-finish-date"
                                        defaultValue={dayjs(goalData.plannedFinish)}
                                        onChange={(value) =>
                                            setGoalData((prev) => ({ ...prev, plannedFinish: dayjs(value?.toDate()).format('YYYY-MM-DD') }))
                                        }
                                    />
                                </LocalizationProvider>
                            </div>
                            <Typography variant="body1">Provide the Comments for the Goal:</Typography>
                            <TextField
                                value={goalData.comments}
                                onChange={handleChange}
                                onKeyDown={preventPropagationOnEnter}
                                required
                                fullWidth
                                data-testid="comments"
                                name="comments"
                            />
                            <Typography variant="body1">Choose preferred value of Balance:</Typography>
                            <div>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={goalData.prefered_value_of_balance}
                                    exclusive
                                    onChange={handleChangeMouseEvent}
                                    aria-label="Platform"
                                    data-testid="preferred-quantity"
                                >
                                    <ToggleButton name="prefered_value_of_balance" value="H">
                                        Higher
                                    </ToggleButton>
                                    <ToggleButton name="prefered_value_of_balance" value="L">
                                        Low
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" color="primary" data-testid="submit-goal">
                                    {editIndex !== null ? 'Update' : 'Add'}
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </ModalContainer>
        </>
    )
}

export default GoalsModal
