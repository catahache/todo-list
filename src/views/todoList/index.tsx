import { Button, Card, Tooltip } from "antd"
import { CheckCircleTwoTone, DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { loadToDoList, removeTask } from "../../store/slices/todoList.slice"
import EditModal from "./EditModal"

const ToDoList = () => {
    const { toDoList } = useSelector((state: RootState) => state.toDoData)
    const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = useState(false)
    const [chosenTask, setChosenTask] = useState<string|null>(null)

    const editTask = async (id:string) => {
        setChosenTask(id)
        handleModal(true)
    }

    const addTask = () => {
        setChosenTask(null)
        handleModal(true)
    }

    const deleteTask = (id: string) => {
        dispatch(removeTask(id))
    }

    const handleModal = (value: boolean) => {
        setOpen(value)
    }

    useEffect(() => {
        dispatch(loadToDoList())
    }, [])

    return (
        <>
            <Tooltip title="Crear tarea">
                <Button onClick={addTask} type="primary" shape="circle" icon={<PlusOutlined />} />
            </Tooltip>
            {toDoList.map(task =>
                <Card title={task.task} extra={task.done && <CheckCircleTwoTone twoToneColor={"green"} style={{ fontSize: '150%' }} />} style={{ width: 300 }}>
                    <p>{task.type}</p>
                    <p>{task.priority}</p>
                    <p>{task.done}</p>
                    {task.subTasks?.map(subT =>
                        <p>{subT}</p>
                    )}
                    <Tooltip title="Editar">
                        <Button onClick={() => { editTask(task._id) }} shape="circle" icon={<EditTwoTone />} />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button onClick={() => { deleteTask(task._id) }} shape="circle" icon={<DeleteTwoTone />} />
                    </Tooltip>
                </Card>
            )}
            <EditModal open={open} id={chosenTask} handleModal={handleModal}/>
        </>
    )
}

export default ToDoList