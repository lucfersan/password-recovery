<p align="center">
  <h3 align="center">📟 Password Recover</h3>

  <p align="center">
    This is a password recovery project where the user uses his/her email to reset the password.
    <br />
    <a href="https://github.com/lucfersan/password-recovery"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/lucfersan/password-recovery/issues">Report Bug</a>
    ·
    <a href="https://github.com/lucfersan/password-recovery/issues">Request Feature</a>
  </p>
</p>

## 📚 About The Project

I wanted to practice the password recovery feature, which is one of the core features of applications that have authentication. This also helped me to improve writing unitary tests using jest and configure a mail provider for the development environment.

I decided to use nodemailer with ethereal, which are great tools to help you work with the email part of your application.

The other tools are basically what I've been using lately, such as, typeorm, express, and so on.

### 🧰 Built With

- [Typescript](https://www.typescriptlang.org/)
- [Express](https://www.npmjs.com/package/express)
- [Typeorm](https://typeorm.io/#/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Uuid](https://www.npmjs.com/package/uuid)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)
- [Jest](https://www.npmjs.com/package/jest)
- [Date-Fns](https://www.npmjs.com/package/date-fns)
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
- [Ethereal](https://ethereal.email/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Class-Transformer](https://www.npmjs.com/package/class-transformer)

### 🚀 Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lucfersan/password-recovery
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Create a docker container
   ```sh
   docker run --name password_recovery -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
   ```
4. Create database named: password_recovery

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🗞️ License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Lucas Fernandes - fernandes.lucas11@outlook.com
