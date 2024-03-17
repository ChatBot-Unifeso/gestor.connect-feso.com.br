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
        <div className="  w-1/2 bg-gradient-to-r from-emerald-800 to-black flex justify-center h-full items-center">
          <h1>logo</h1>
        </div>
        <div className="w-1/2 flex-col flex justify-center h-full items-center bg-white">
          <h1 className="w-full text-start text-3xl font-bold px-2 mb-2 border-b-1 border-zinc-400 pb-2">
            Login
          </h1>
          <p className="w-full text-start text-sm px-2 mb-2">
            Bem-vindo de volta! Insira seu login para entrar em sua conta.
          </p>
          <form onSubmit={submit} className="flex flex-col w-full p-2">
            <div className="flex w-full flex-col mb-2">
              <label htmlFor="">E-mail</label>
              <input
                name="email"
                className=" border-1 m focus:outline-none  focus:ring-emerald-600 border-[1px] border-zinc-400 w-full h-10 px-2 rounded-full"
                type="text"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Senha</label>
              <input
                name="password"
                className="border-1 focus:outline-none  focus:ring-emerald-600 border-[1px] border-zinc-400 w-full h-10 px-2 rounded-full"
                type="text"
              />
            </div>
            <p>
              <a href="#" className="text-emerald-600">
                Esqueceu a senha?
              </a>
            </p>
            <button
              type="submit"
              className="w-full h-10 bg-emerald-600 text-white rounded-full mt-2 "
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
