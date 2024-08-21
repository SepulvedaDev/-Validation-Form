import React from 'react'
import { useForm } from 'react-hook-form'

const formulario = document.querySelector('#formulario')

function App() {

  const { register, handleSubmit,
    formState: { errors }, watch
  } = useForm()

  const onSubmit = handleSubmit((e) => {
    alert('datos enviados...')
    console.log(e)
    formulario.reset(register)
  })

  const selectCountry = watch('pais')
  const InfoPais = {
    ar: { placeholder: 'Provincia', name: 'provincia', message: 'Provincia requerida' },
    mx: { placeholder: 'Estado', name: 'estado', message: 'Estado requerido' },
    ch: { placeholder: 'Región', name: 'region', message: 'Región requerida' }
  };

  const Info = InfoPais[selectCountry]
  return (
    <form id='formulario' onSubmit={onSubmit}>
      <h1>Formulario</h1>
      <h2>Rellena los datos</h2>

      <label htmlFor="nombre">Nombre</label>
      <input type="text" id="nombre"
        {...register("nombre", {
          required: {
            value: true,
            message: 'Nombre es obligatorio'
          },
          minLength: {
            value: 3,
            message: 'minimo 3 caracteres'
          }
        })}
      />
      {
        errors.nombre && <span>{errors.nombre.message}</span>
      }

      <label htmlFor="correo">Correo</label>
      <input type="email" id="correo"
        {...register("correo", {
          required: {
            value: true,
            message: 'Correo es requerido'
          },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'correo no es valido'
          }
        })}
      />
      {
        errors.correo && <span>{errors.correo.message}</span>
      }

      <label htmlFor="password">Password</label>
      <input type="password" id="password"
        {...register("password",
          {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            },
            minLength: {
              value: 4,
              message: 'minimo 4 caracteres'
            },
            maxLength: {
              value: 25,
              message: 'maximo de 25 caracteres'
            }
          }
        )}
      />
      {
        errors.password && <span>{errors.password.message}</span>
      }
      <label htmlFor="repeatPassword">Repeat Password</label>
      <input type="password" id="repeatPassword"
        {...register("repeatPassword",
          {
            required: {
              value: true,
              message: 'Confirme su contraseña'
            },
            validate: value => value === watch('password') || 'las contraseñas no son iguales'
          }
        )}
      />
      {
        errors.repeatPassword && <span>{errors.repeatPassword.message}</span>
      }
      <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
      <input type="date" id="fechaNacimiento"
        {...register("FechaNacimiento", {
          required: {
            value: true,
            message: 'Fecha de nacimiento es requerida'
          },
          validate: (datos) => {
            const fechaNacimiento = new Date(datos)
            const fechaActual = new Date()
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()

            return edad >= 18 || 'tienes que ser mayor de edad'
          }
        })}
      />
      {
        errors.FechaNacimiento && <span>{errors.FechaNacimiento.message}</span>
      }
      <label htmlFor="pais">País</label>
      <select id="pais"{...register("pais")}>
        <option>Seleccione un pais</option>
        <option value="ch">Chile</option>
        <option value="mx">México</option>
        <option value="ar">Argentina</option>
      </select>
      {Info && (
        <>
          <input type='text' placeholder={Info.placeholder} {...register(Info.name, {
            required: { value: true, message: Info.message }
          })} />
          {errors[Info.name] && <span>{errors[Info.name].message}</span>}
        </>
      )}


      <label htmlFor="foto">Foto de perfil</label>
      <input type="file" id="file"
        {...register("foto")}
      />

      <label htmlFor="terminos">
        <input type="checkbox" id="terminos"
          {...register("terminos", {
            required: true
          })}
        />
        Acepto términos y condiciones
        {
          errors.terminos && <span> Acepte los terminos y condiciones X</span>
        }
      </label>

      <button type="submit" id="mandar">Enviar</button>

    </form>
  );

}


export default App
