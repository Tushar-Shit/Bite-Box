import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ChangeEmailOTP({ username, otp }) {
  return (
    <Html>
      <Head />
      <Preview>{otp} is your BiteBox email verification code.</Preview>

      <Tailwind>
        <Body className="bg-stone-100 py-5 font-sans text-stone-800">
          <Container className="mx-auto max-w-150 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">
            {/* Header */}
            <Section className="border-b border-stone-200 px-4 py-4 text-center">
              <Heading className="m-0 text-3xl font-extrabold text-orange-600">
                BiteBox
              </Heading>

              <Text className="mt-1 mb-0 text-sm text-stone-500">
                Email Verification
              </Text>
            </Section>

            {/* Body */}
            <Section className="px-4 py-4">
              <Heading className="m-0 text-2xl font-bold text-stone-900">
                Hello {username},
              </Heading>

              <Text className="mt-3 text-[15px] leading-6 text-stone-600">
                We received a request to change the email address associated
                with your BiteBox account.
              </Text>

              <Text className="mt-2 text-[15px] leading-6 text-stone-600">
                This code is only for varify your new email address, please use
                the code to complete your email update.
              </Text>

              {/* OTP Box */}
              <Section className="my-6 rounded-2xl border border-orange-200 bg-orange-50 px-6 py-6 text-center">
                <Text className="m-0 text-xs font-semibold uppercase tracking-[4px] text-orange-700">
                  Verification Code
                </Text>

                <Heading className="mt-3 mb-0 text-[56px] font-black tracking-[10px] text-stone-900">
                  {otp}
                </Heading>

                <Text className="mt-3 text-sm font-medium text-stone-500">
                  Expires in{" "}
                  <span className="font-semibold text-orange-600">
                    5 minutes
                  </span>
                </Text>
              </Section>

              {/* Security */}
              <Text className="text-sm leading-6 text-stone-500">
                <strong>Didn't request this?</strong>
                <br />
                You can safely ignore this email. Your account email will not be
                changed unless this verification code is entered successfully.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-stone-200 bg-stone-50 px-6 py-5 text-center">
              <Heading className="m-0 text-xl font-bold text-orange-600">
                BiteBox
              </Heading>

              <Text className="mt-1 text-sm text-stone-500">
                Fast • Fresh • Delicious
              </Text>

              <Hr className="my-4 border-stone-200" />

              <Text className="m-0 text-xs leading-5 text-stone-400">
                This is an automated email. Please do not reply.
              </Text>

              <Text className="mt-2 text-xs text-stone-400">
                © 2026 BiteBox. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
