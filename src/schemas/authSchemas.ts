import { z } from 'zod'

export const loginSchema = z.object({
  usernameOrEmail: z.string().trim().min(1, 'กรุณากรอกชื่อผู้ใช้หรืออีเมล / Username or email is required'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน / Password is required'),
})

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, 'กรุณากรอกชื่อ / First name is required'),
  lastName: z.string().trim().min(1, 'กรุณากรอกนามสกุล / Last name is required'),
  staffId: z.string().trim().min(1, 'กรุณากรอกรหัสพนักงาน / Staff ID is required'),
  department: z.string().trim().min(1, 'กรุณากรอกแผนก / Department is required'),
  email: z.string().min(1, 'กรุณากรอกอีเมล / Email is required').email('รูปแบบอีเมลไม่ถูกต้อง / Invalid email'),
  phone: z.string().regex(/^0\d{8,9}$/, 'กรุณากรอกเบอร์โทร 9–10 หลัก / Invalid phone number'),
  password: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร / Minimum 8 characters')
    .regex(/[A-Z]/, 'ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว / Add an uppercase letter')
    .regex(/[a-z]/, 'ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว / Add a lowercase letter')
    .regex(/\d/, 'ต้องมีตัวเลขอย่างน้อย 1 ตัว / Add a number'),
  confirmPassword: z.string().min(1, 'กรุณายืนยันรหัสผ่าน / Please confirm your password'),
  acceptTerms: z.boolean().refine(Boolean, 'กรุณายอมรับข้อกำหนด / Please accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'รหัสผ่านไม่ตรงกัน / Passwords do not match', path: ['confirmPassword'],
})

export type LoginValues = z.infer<typeof loginSchema>
export type RegistrationValues = z.infer<typeof registrationSchema>

export const kolPersonalDataSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  phone: z.string().trim().min(1, 'Phone number is required')
    .regex(/^0\d{8,9}$/, 'Please enter a valid phone number'),
  lineId: z.string().trim().max(50, 'LINE ID must be 50 characters or fewer'),
})

export type KolPersonalDataValues = z.infer<typeof kolPersonalDataSchema>
