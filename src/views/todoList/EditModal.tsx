import { Button, Checkbox, Form, Input, InputNumber, Modal, Select } from "antd"
import { Task } from "../../interfaces/todoList"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { createTask, updateTask } from "../../store/slices/todoList.slice"
import { useEffect, useState } from "react"
import { getChosenTask } from "../../api/todo"

const EditModal = ({ open, handleModal, id }) => { //TODO solucionar ts
    const dispatch = useDispatch<AppDispatch>()
    const { auth } = useSelector((state: RootState) => state.authData)
    const [chosenTask, setChosenTask] = useState<Task>({} as Task)
    const [loading, setLoading] = useState(false) //TODO ts
    const initialValuesChosenTask = {
        done: chosenTask.done,
        type: chosenTask.type,
        task: chosenTask.task,
        priority: chosenTask.priority,
        subTasks: chosenTask.subTasks,
    }
    const initialValuesNewTask = {
        type: 'others'

    }

    useEffect(() => {
        if (id) {
            setLoading(true)
            loadChosenTask()
        }
    }, [id])

    const loadChosenTask = async () => {
        const response = await getChosenTask(id)
        setChosenTask(response.data)
        setLoading(false)
    }


    const onFinish = (values: Task) => {
        if (!!id) { //Edits task
            dispatch(updateTask({ ...chosenTask, ...values }))
        } else {
            dispatch(createTask({ //Creates task
                ...values,
                user: auth.user._id,
            }))
        }
        handleModal(false)
    }

    return (
        <Modal
            afterClose={() => setChosenTask({} as Task)}
            title="Crear nueva tarea"
            open={open}
            confirmLoading={false}
            onCancel={() => handleModal(false)}
            footer={[
                <Button form="createTask" key="submit" htmlType="submit">
                    {!!id ? 'Editar' : 'Crear'}
                </Button>
            ]}
            destroyOnClose={true}
        >{!loading &&
            <Form
                id="createTask"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                initialValues={!!id ? initialValuesChosenTask : initialValuesNewTask}
                preserve={false}
            >
                <Form.Item label="Tarea" name="task" rules={[{ required: true, message: 'El nombre de la tarea es requerido', }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Terminada" name="done" valuePropName="checked">
                    <Checkbox />
                </Form.Item>
                <Form.Item label="Tipo de tarea" name="type">
                    <Select>
                        <Select.Option value="study">Estudio</Select.Option>
                        <Select.Option value="work">Trabajo</Select.Option>
                        <Select.Option value="home">Hogar</Select.Option>
                        <Select.Option value="others">Otras</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Tareas relacionadas" name="subTasks">
                    <Select mode="tags" placeholder="Agregar...">
                        <Select.Option key={0}>Comprar manteca</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Prioridad" name="priority">
                    <InputNumber />
                </Form.Item>
            </Form>}
        </Modal>
    )
}

export default EditModal