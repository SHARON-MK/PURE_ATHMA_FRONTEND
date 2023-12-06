import React from 'react'
import {Button, Form, Input} from 'antd'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../../helper/redux/alertsSlice'

function OtpPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (value) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/otp', value)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
            } else {
                dispatch(hideLoading())
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast('somthing went wrong')
        }
    }
    return (
    <div className='authentication'>
        <div className='authentication-form card p-4'>
            <h1 className='card-title'> Verify Your Accouont </h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label='Enter OTP' name='otp'>
                    <Input placeholder='OTP'/>
                </Form.Item>
                <Button className='primary my-1' htmlType='submit'> VERIFY </Button>
            </Form>
        </div>
    </div>
    )
}

export default OtpPage
