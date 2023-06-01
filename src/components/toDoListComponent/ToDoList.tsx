import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { loadToDoList, removeTask } from "../../store/slices/todoList.slice"
import { Button, Collapse, Modal, Space, Tooltip } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { TYPES } from "../../constants/tasks"
import EditModal from "../../components/editModal/EditModal"
import { ExclamationCircleFilled } from '@ant-design/icons';
import TaskCard from "../../components/taskCard/TaskCard"
import "./toDoList.css"
import "../../style/globalStyles.css"
import { Task } from "../../interfaces/todoList"

type ReduceTasksType = {
    [key: string]: Task[]
}

const ToDoList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { toDoList } = useSelector((state: RootState) => state.toDoData)
    const [chosenTask, setChosenTask] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const tasksByType = toDoList.reduce<ReduceTasksType>((acc, obj) => {
        const type = obj.type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(obj);
        return acc;
    }, {})
    const [activeKeys, setActiveKeys] = useState<string | string[]>(TYPES.map(type => type.type)); // Estado local para controlar las keys activas


    const editTask = async (id: string) => {
        setChosenTask(id)
        handleModal(true)
    }

    const handleModal = (value: boolean) => {
        setOpen(value)
    }

    const showConfirm = (id: string) => {
        Modal.confirm({
          title: '¿Estás seguro de querer eliminar esta tarea?',
          icon: <ExclamationCircleFilled />,
          content: 'No podrás recuperarla más tarde :(',
          okText: 'Eliminar',
          cancelText: 'Cancelar',
          onOk() {
            dispatch(removeTask(id))
          }
        })
      }

    const addTask = () => {
        setChosenTask(null)
        handleModal(true)
    }

    const handleCollapseChange = (keys: string | string[]) => {
        setActiveKeys(keys)
    }

    useEffect(() => {
        dispatch(loadToDoList())
    }, [])

    return (
        <>
            <div className="row align-items-center justify-content-center mb-10 br-10 addTaskStyle">
                <Tooltip title="Crear tarea">
                    <Button onClick={addTask} icon={<PlusOutlined />} />
                </Tooltip>
                <div className="ml-10">
                    Añadir nueva tarea
                </div>
            </div>
            <Collapse bordered={false} activeKey={activeKeys} onChange={handleCollapseChange}>
                {
                    Object.keys(tasksByType)?.map(type =>
                        <Collapse.Panel className="text-align-left" header={TYPES.find(t => type === t.type)?.label} key={type}>
                            <Space direction="vertical" size="middle" className="text-align-left">
                                {tasksByType[type]?.sort((a, b) => a.priority - b.priority)?.map(task =>
                                    <TaskCard task={task} editTask={editTask} deleteTask={showConfirm} />
                                )}
                            </Space>
                        </Collapse.Panel>
                    )
                }
            </Collapse>
            <EditModal open={open} id={chosenTask} handleModal={handleModal} />
        </>
    )
}

export default ToDoList