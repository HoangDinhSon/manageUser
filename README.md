# in program use useReducer , useContext make global state

# Note config to import "../../"--> "~/MyComponent/Menu

    1.setup npm install -D vite-tsconfig-paths
    2. in file  tsconfig.json
     "baseUrl": "./",
        "paths": {
            "~/*": ["./src/*"]
        },
    3.in File vite.config
       resolve: {
            alias: {
                "~":'/src',
            },
        },

# userReducer

1. init state
2. actions
3. reducer
4. dispatch

# useContext

useContext
truyền state từ cha sang con  
update state cha thì con cũng thay đổi

1. tạo ra context ==> dùng themeContext = createContext()
   lúc này thằng themecontext là object có 2 giá trị : Provider và customer
2. provider
   themeContext bọc cha lại value =payload
3. consumer
   muốn dùng trong con thì
   b1: import themeContext
   b2 : dùng payload = useContext ( themeContext )

# make component base div

# React Hook Form and Yup

    step 1: schema -->
    step 2: type (because typescript)
    step 3: resolver --> object
    step 4: pass into useForm()
    get value in form register
    display data for form asynchronous and synchronized
    notify cation with errors combine with yup

# Destructor

    dùng cập nhật state,
    1
    return {classAsideBar,classListItem} ==> return một mảng có
    {
        classAsideBar:classAsideBar,
        classListItem:classListItem
    }

# duyệt qua tất cả các phần tử trong object

    step :1 lấy key của object cho vào một mảng ,
    step :2 duyệt qua mảng

# lấy biến chung để responsive

# Tailwindcss

1. @base
2. @component --> tạo ra class mới
3. @utilities ()--> class write in there will higher priority class in base , in component

dùng biến : border-t-[length:--borderWidth] chỉ dùng khi đi với var còn tailwindcss thì tự biết

# response

1. MUI : dùng CSS cho component MUI
   b1 : setup ĐIỂM breakpoint o global
   b2 : dùng useMediaquery( theme.breakpoint.down ()) or up() ; có lấy giá trị diểm breakpoint cho ta một giá trị boolean và đi css cho
2. Tailwindcss
   b1: setup KHOẢNG breakpoint

# flex

    1. index : thứ tự giữa các item
    2. flex-grow : css cho 1 itemflex nếu =1 nó chiếm toàn bộ không gian trống

# window

    window.screen tính cả scroll bar
    window.innerScreen không tính scroll bar

# Array

    các phương thức làm việc với mảng.
        1. tạo một mảng dựa trên mảng gốc: mảng mới = mảng cũ + thêm 1 phần tử destructing
        2. chỉnh sửa mãng gốc: thệm một phần tử vào đầu mảng .push().

# string

# object

# env

    dùng biến trong file src và dùng biến trong file config
    1. use myFile :(src/)
         import.meta.env.VITE_PORT ==> KHÔNG CÓ DẤU ";;;;;;;;;;;;"
    2. use file config install : npm i dotenv , npm i @types/node
          require('dotenv').config();
          process.env.<biến môi trường> ==> KẾT QUẢ SẼ CÓ 1 DẤU ";:::"

# Transition

    b1: trạng thái ba đầu w-100px
    b2 : hành động làm thay đổi trạng thái
    b3 : trạng thái sau w-200px

# Animation

    b1: đăng kí name , duration cho cái thẻ cần dc animation
    b2: @keyFrame

# Hamburger /

    chứa các thẻ con cùng cấp
    input type= checkbox
    label cùng id
    div chứa (many thing )

# dùng useMutation with axios.get

    bình thường phương thức get sẽ dùng với useQuery
    nhưng để triger một hàm call Api we use useMutation get .
    b1. tạo hàm call api
    b2. dùng mutate để triger

# useEffect

dependence trong useEffect mà một mảng có thể chứa , 1 mảng , chứa 1 biểu thức , chứa hàm
ví dụ [isDisplay===false]

# thêm file vảo trong in put

    lắng nghe sự kiện event
    b1 : event.target.files type object {0: data 1 ,  2 data 2 , }
    set state
    nếu có sửa xóa thì lấy state ra chỉnh sửa sau đó cập nhật lại state

# CSS

    - tính tổng 2 giá trị của biề trong css
    - lấy chiều dài của thẻ div này gán cho thẻ div khác ??
    - selector chọn một thẻ đồng thời có 2 class : .class1.class2 (ghi sát nhau )

# react query

    -c1 Component nào dùng api thì gọi trong component đó ok hơn
    -c2  Gọi api trong component cha sau đó --> lưu vào global state (reducer)

# @media Response

    response : tailwind max , min đều lấy dấu bằng .
    response : CSS thông thường max , min đều lấy dấu bằng .
    response : Mui Max không lấy dấu bằng tại break point , min có lấy dấu bằng
    CSS cho đồng thời chiều cao và chiều rộng :
        @media screen and (min-width: 1281px) and (max-height:900px) {}

# tạo Transition khi Mount và unMount

     dùng scale =0 --> scale 100 vì ta dùng fixed nếu dùng width thì thẻ con fixed sẽ không có tác dụng cho dù có dùng overflow :auto.

# react hot toast

    <Toaster>
    cần đặt ngay tại vị trí ngoài cùng để đảm bảo thông báo sẽ luôn dc hiển thị ra ngoài APP , main

# Redux :
/_
Redux reducer :
step 1: make reducer (initial state , and reducer )
step 2: in store run it and save it in key
step 3: consumer in component , or dispatch actions
Each App should reducer private
_/
