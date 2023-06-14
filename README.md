# in program use useReducer , useContext make global state 

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
themeContext  bọc cha lại value =payload 
3. consumer 
muốn dùng trong con thì 
b1: import themeContext 
b2 : dùng payload  = useContext ( themeContext )
# make component base div 
# bố trí file trong dự án
    src
        store 
        component 
        dummydata.tsx 




