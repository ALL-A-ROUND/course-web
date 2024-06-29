"use client"

import {Button, Form, Input, Select} from 'antd';
import Uploader from "@/app/manage/components/Uploader";
import {useState} from "react";
import {api} from "@/app/utils";

const {TextArea} = Input;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export default function LessonForm({params: {unit_id}}) {
    const [form] = Form.useForm();
    const [file, setFile] = useState();

    const onFinish = (values) => {
        api("POST", `/lesson`, {
            ...values,
            unit_id,
            file: 'uploads/' + file.successful[0].meta.userId + '/' + file.successful[0].meta.name,
        }).catch((err) => {
            alert(err.message)
        }).then((res) => {
            alert('新增素材成功')
            location?.reload()
        })
    };
    return (
        <div>
            <h1 className={"text-2xl"}>新增素材</h1>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{maxWidth: 600}}
            >
                <Form.Item name="title" label="素材名稱" rules={[{required: true}]}>
                    <Input placeholder="未命名的素材"/>
                </Form.Item>
                <Form.Item name="article" label="素材描述">
                    <TextArea placeholder="請輸入素材描述" autoSize/>
                </Form.Item>
                <Form.Item label="影片存取權" name="watch_permission_type"
                           rules={[{required: true, message: '請選擇一個項目'}]}>
                    <Select options={[
                        {value: '30-free', label: <span>30秒免費</span>, active: true},
                        {value: 'full-free', label: <span>完整免費</span>},
                        {value: 'full-paid', label: <span>完整付費</span>}
                    ]}/>
                </Form.Item>

                <Uploader setFile={setFile}/>

                <div>
                    <Button type="primary" htmlType="submit" className={"w-full"}>
                        新增素材
                    </Button>
                </div>
            </Form>
        </div>
    );
};
