const faqs = [
    {
        id: 1,
        question: "課程突然不想看了，可以退費嗎？",
        answer: `                若在購買後 7 天內，確認未觀看正式課程影片、檔案，皆可申請退費。

                請提供你購買時輸入的姓名、電子信箱並說明退費原因，來信至（學院管理者的客服信箱），會有專人審核後受理退費。

                ⚠️小提醒：以上文字你可直接複製貼上到自己學院的 FAQ，倘若不想要讓學員有猶豫期，請事先提供課程「 試聽或試看
                」的機會，並在課程介紹頁面說明清楚，以避免後續不必要的糾紛。`
    },
    {
        id: 2,
        question: "付款方式有哪幾種？可以接受分期付款嗎？",
        answer: `我們可以接受信用卡一次付清、信用卡分期付款（三期、六期），ATM 匯款及超商代碼繳費。`
    },
    {
        id: 3,
        question: "我有拿到課程邀請代碼，該如何使用？",
        answer: `點選「加入課成」按鈕，有邀請碼欄位。`
    },
    {
        id: 4,
        question: "課程有觀看期限嗎？",
        answer: `購買課程後，2 年內不受時間及地點限制，皆可無限次數、重複觀看內容！如未來課程有任何更新，都可以持續學習，不用再額外付費。`
    },
    {
        id: 5,
        question: "發票可以打統編嗎？",
        answer: `可以打統編，請記得在付款時「發票類型」選擇「統編發票」，並輸入統一編號與公司抬頭，之後會寄送電子發票到你註冊時留的
                Email 信箱。

                ⚠️小提醒：如你是個人戶使用者（包括免開立發票的行號、工作室），你的學院結帳頁面，是「不會」有填寫發票統編的欄位。`
    },
    {
        id: 6,
        question: "購買課程有提供發票嗎？",
        answer: `我們有提供電子發票，課程購買後，會直接寄送到你註冊的 Email 信箱。

                ⚠️小提醒：如你是個人戶使用者（包括免開立發票的行號、工作室），是無法提供學員發票的，如有需要提供發票給學員，請先成立公司。`
    }, {
        id: 7,
        question: "海外學員可否購買跟觀看課程？",
        answer: `可以！歡迎各地學員一同來上課，付款方式請選擇信用卡。

                根據我們的經驗，多數海外學員應該都可以正常觀看，唯身處中國的學員，無法做完全保證。
                如果擔心因網路連線問題，無法觀看課程，可以先點選試看課程測試喔！`
    }, {
        id: 8,
        question: "選擇 ATM / 超商付費方式，卻忘記去繳款，該怎麼辦？",
        answer: `逾期未繳款，訂單系統將自動判定為「已失效」，將不具任何效益。

                提醒你，請務必在繳費期限內完成繳費，避免造成繳費期限已過，而失去當時優惠價格的情形發生哦！

                📌關於課程與觀看問題`
    }, {
        id: 9,
        question: "購買成功後，我該如何觀看課程？",
        answer: `購買課程、付款成功之後，你的上課權限就直接開通囉！
                你可以使用電腦、手機及平板裝置觀看。

                購課後，觀課方式如下：

                請前往學院網站右上方點選「登入」
                確認登入後，到「我的購買」，點選「我的課程」，找到你購買的課程即可觀課！
                如果你購買的線上課程，是「預購課程」，需等待課程正式開課、影片上架後，方可看到課程。

                （開課詳情，請見課程介紹頁面說明）`
    },
]

export default function Example() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">常見問題</h2>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        為了協助您在使用服務過程中可能遇到的狀況，以下為常見問題解答
                        <br/>
                        <a href="mailto:administrator@esgltc.com"
                           className="font-semibold text-indigo-600 hover:text-indigo-500">
                            客服信箱：administrator@esgltc.com
                        </a>{' '}
                    </p>
                </div>
                <div className="mt-20">
                    <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
                        {faqs.map((faq) => (
                            <div key={faq.id}>
                                <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
