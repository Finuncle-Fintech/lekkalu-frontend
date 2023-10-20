import React from 'react'
import { GoalsType } from 'types/goals'
import { Table, TableBody, TableRow, TableCell, IconButton, TableHead } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'
import './Goals.css'
import { columns } from './utils'
import { GoalDataInterface } from './GoalsInterfaces'

type Props = {
    goals: GoalsType[],
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
    setStatusModal: React.Dispatch<React.SetStateAction<boolean>>,
    deleteGoal: (id: number) => void
}

const GoalsList = ({ goals, setEditIndex, deleteGoal, setStatusModal }: Props) => {
    const deleteHandler = (goal: GoalDataInterface) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this",
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: 'Red',
        }).then((res) => {
            if (res.isConfirmed) {
                if (goal.id !== undefined) {
                    deleteGoal(goal.id)
                }
                Swal.fire('Deleted', 'Your goal deleted successfully.', 'success')
            }
        })
    }

    // const getBalanceCellStyle = (goal: GoalDataInterface) => {
    //     if (typeof goal.balance === 'number') {
    //         return getStyle(goal.preferredQuantity, goal.balance, goal.currentMetric)
    //     } else if (typeof goal.balance === 'string') {
    //         const current = Number(goal.currentMetric?.split('%')[0])
    //         const balance = Number(goal.balance?.split('%')[0])
    //         return getStyle(goal.preferredQuantity, balance, current)
    //     }
    // }

    // const getStyle = (preferredQuantity, balance, current) => {
    //     if (preferredQuantity === 'lower') {
    //         if (balance > current) {
    //             return 'green-opaque-bg'
    //         } else {
    //             return 'red-opaque-bg'
    //         }
    //     } else {
    //         if (balance > current) {
    //             return 'red-opaque-bg'
    //         } else {
    //             return 'green-opaque-bg'
    //         }
    //     }
    // }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {goals &&
                    Boolean(goals.length) &&
                    goals.map((goal, index: number) => {
                        const balanceCellStyle = 'getBalanceCellStyle(goal)'
                        return (
                            <TableRow key={goal.id}>
                                <TableCell>{goal.goal}</TableCell>
                                {typeof goal.target_metric === 'number' ? (
                                    <TableCell>&#8377; {goal.target_metric.toLocaleString('en-IN')}</TableCell>
                                ) : (
                                    <TableCell>{goal.target_metric}</TableCell>
                                )}
                                {typeof goal.current_metric === 'number' ? (
                                    <TableCell>&#8377; {goal.current_metric.toLocaleString('en-IN')}</TableCell>
                                ) : (
                                    <TableCell>{goal.current_metric}</TableCell>
                                )}
                                {typeof goal.balance === 'number' ? (
                                    <TableCell className={balanceCellStyle}>&#8377; {goal.balance.toLocaleString('en-IN')}</TableCell>
                                ) : (
                                    <TableCell className={balanceCellStyle}>{goal.balance}</TableCell>
                                )}
                                <TableCell>{goal.reachability_in_months}</TableCell>
                                <TableCell>{goal.reachability_in_years}</TableCell>
                                <TableCell>{goal.started && new Date(goal.started).toLocaleDateString('en-US')}</TableCell>
                                <TableCell>{goal.finished && new Date(goal.finished).toLocaleDateString('en-US')}</TableCell>
                                <TableCell>{goal.planned_start && new Date(goal.planned_start).toLocaleDateString('en-US')}</TableCell>
                                <TableCell>Goal Planned Finished</TableCell>  {/* they do not match the data, in the post they accept it as plannedFinished and in the get they send it as planned_finished. */}
                                <TableCell>Comments here</TableCell> {/* the data do not match, in the post they accept comments and in the get they do not send it. */}
                                <TableCell>
                                    <IconButton
                                        placeholder='edit-goal'
                                        edge='end'
                                        onClick={() => {
                                            setEditIndex(index)
                                            setStatusModal(true)
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        placeholder='delete-goal'
                                        edge='end'
                                        onClick={() => {
                                            deleteHandler(goal)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
            </TableBody>
        </Table>
    )
}

export default GoalsList
