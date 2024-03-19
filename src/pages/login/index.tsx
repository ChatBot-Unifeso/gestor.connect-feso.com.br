import logo from './imgs/logo-connectFeso.png'

export const Login = () => {
  const submit = (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    console.log(email, password)
  }
  return (
    <main className="w-full h-screen flex justify-center items-center bg-[#327D6B]">
      <section className="w-[80%] h-[80%] flex justify-between items-center border-1 border-zinc-400">
        <div className="ps-8[50px] w-1/2 bg-gradient-to-r from-emerald-800 to-black flex justify-center h-full items-center ">
        <div className="h-[30rem] w-[30rem] flex justify-center align-center items-center">
            <img src={logo} alt="Logo ConnectFeso"/>
          </div>
        </div>
        <div className="w-1/2 px-20 gap-2 flex-col flex justify-center h-full items-center bg-white">
          <h1 className="w-full text-5xl text-start text-2xl font-bold mb-2 border-b-1 border-zinc-400 pb-2 text-emerald-600 font-bold">
            Login
          </h1>
          <p className="w-full text-start text-sm mb-2 text-base">
            Bem-vindo de volta! Insira seu login para entrar em sua conta.
          </p>
          <form onSubmit={submit} className="flex flex-col w-full  gap-8 items-center pt-10">
            <div className="flex w-full flex-col mb-2 gap-2">
              <label htmlFor="">E-mail</label>
              <input
                name="email"
                className=" border-1 m focus:outline-none  focus:ring-emerald-600 border-[1px] border-zinc-400 w-full h-[3rem] px-2 rounded-full font-regular"
                type="text"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="">Senha</label>
              <input
                name="password"
                className="border-1 focus:outline-none  focus:ring-emerald-600 border-[1px] border-zinc-400 w-full h-[3rem] px-2 rounded-full"
                type="password"
              />
            </div>
            <p>
              <a href="#" className="text-emerald-600">
                Esqueceu a senha?
              </a>
            </p>
            <button
  type="submit"
  className="w-[20rem] h-[3rem] bg-emerald-600 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-slate-700 via-emerald-600 to-emerald-600 hover:via-teal-300"
>
              Entrar
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
