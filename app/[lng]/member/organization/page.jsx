"use client"
import {useEffect, useState} from 'react'
import {api} from "@/app/[lng]/utils";
import useUser from "@/app/[lng]/useUser";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/firebase";
import {Button, Card, Empty, Form, Input} from "antd";


export default function Member() {
    const [user, setUser] = useState()
    const [trash, loading, error] = useAuthState(auth)

    useEffect(() => {
        if (loading) return
        api("GET", "/user?with=organization").then((res) => {
            setUser(res)
        })
    }, [loading]);

    const [showOrg, setShowOrg] = useState(false)
    const [showJoin, setShowJoin] = useState(false)

    const generate = (id) => {
        api('POST', '/organization/' + id + '/generate').then(res => {
            alert("邀請碼: " + res.invite_code)
        })
    }

    const join = (form) => {
        const code = form[0].value
        api('POST', '/organization/join', {
            invite_code: code
        }).then(res => {
            alert("加入成功")
            location.reload()
        }).catch(e => {
            alert("加入失敗 " + e)
        })
    }

    return (
        <>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <div className={"flex justify-between"}>
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">我的組織</h2>
                            <p className="mt-1 text-sm leading-5 text-gray-500">管理您的組織</p>
                        </div>
                        <div className={"flex gap-1"}>
                            {location && location.search.includes("debug") && (
                                <Button type={"primary"} onClick={e => {
                                    setShowOrg(true)
                                }}>新增組織</Button>
                            )}
                            <Button type={"primary"} onClick={e => {
                                setShowJoin(true)
                            }}>加入組織</Button>
                        </div>
                    </div>
                    <div className={"w-full h-full flex justify-center items-center"}>
                        {user && user.organization ? (
                            <Card>
                                <Card key={user?.organization?.id} title={user?.organization?.name}
                                      extra={<Button type={"link"}
                                                     onClick={e => generate(user?.organization?.id)}>產生邀請碼</Button>}>
                                    <p>組織ID: {user?.organization?.id}</p>
                                    <p>組織名稱: {user?.organization?.name}</p>
                                </Card>
                            </Card>
                        ) : (
                            <Empty description={"您尚未加入任何組織"}/>
                        )}

                    </div>
                    {
                        showOrg && (
                            <Form onSubmitCapture={e => {
                                e.preventDefault()
                                api('POST', '/organization', {
                                    name: e.target[0].value,
                                    _method: "PUT"
                                }).then(res => {
                                    console.log(res)
                                    alert("新增成功")
                                    location.reload()
                                })
                            }}>
                                <Form.Item label={"組織名稱"}>
                                    <Input type="text" className={"w-full"}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type={"primary"} htmlType={'submit'}>新增</Button>
                                </Form.Item>
                            </Form>
                        )
                    }

                    {
                        showJoin && (
                            <Form onSubmitCapture={e => join(e.target)}>
                                <Form.Item label={"邀請碼"}>
                                    <Input type="text" className={"w-full"}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type={"primary"} htmlType={'submit'}>新增</Button>
                                </Form.Item>
                            </Form>
                        )
                    }

                </div>
            </div>
        </>
    )
}
