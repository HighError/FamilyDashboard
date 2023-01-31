import { NextPage } from 'next'

const SignIn: NextPage = (): JSX.Element => {
  return (
    <div>
      <form>
        <input type="email" placeholder="email"></input>
        <input type="password" placeholder="password"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default SignIn
