import random


def play_number_guessing_game() -> None:
    print("=== 숫자 맞히기 게임 ===")
    print("1부터 100 사이 숫자를 맞혀보세요!")

    answer = random.randint(1, 100)
    attempts = 0

    while True:
        user_input = input("숫자를 입력하세요 (종료: q): ").strip()

        if user_input.lower() == "q":
            print(f"게임 종료! 정답은 {answer}였습니다.")
            break

        if not user_input.isdigit():
            print("숫자만 입력해주세요.")
            continue

        guess = int(user_input)
        attempts += 1

        if guess < answer:
            print("UP! 더 큰 숫자입니다.")
        elif guess > answer:
            print("DOWN! 더 작은 숫자입니다.")
        else:
            print(f"정답입니다! 시도 횟수: {attempts}번")
            break


if __name__ == "__main__":
    play_number_guessing_game()
